import React, { Component, Fragment } from 'react';

export default class GroupMultiple extends Component {
	constructor() {
		super();
		this.state = {
			symptoms: [],
		};
	}

	checkSymptom = e => {
		let { checked, id } = e.target;
		let choiceId = checked ? 'present' : 'absent';

    this.setState(({symptoms}) => ({
      symptoms: symptoms.map(item => {
        if (id === item.id) {
          item.choice_id = choiceId
        }

        return item;
      })
    }));
	}

	handleSymptoms = () => {
		this.props.callbackQuestion(
			this.state.symptoms
		);
	}

	componentWillMount() {
		this.setState({
			symptoms: this.props.items.map(item => {
				return {
					id: item.id,
					choice_id: 'absent',
				}
			})
		});
	}

	componentDidUpdate() {
		let elm = document.querySelector('button');
		elm.style.visibility = 'hidden';

		if (this.state.symptoms.findIndex(item => item.choice_id === 'present') !== -1) {
			elm.style.visibility = 'visible';	
		}
	}

	render() {
		return (
			<Fragment>
				<div className="form-group">
					{this.props.items.map((item) =>
						<div key={item.id} className="form-check">
							<input type="checkbox"
								id={item.id}
								name="group"
								value="present"
								onChange={this.checkSymptom}
								className="form-check-input" />

							<label htmlFor={item.id}
								className="form-check-label">
								{item.name}
							</label>
						</div>
					)}
				</div>
				<button className="btn btn-primary btn-lg btn-block next-btn" onClick={this.handleSymptoms}>Next</button>
			</Fragment>
		);
	}
}