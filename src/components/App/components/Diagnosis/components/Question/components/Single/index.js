import React, { Component, Fragment } from 'react';

export default class Single extends Component {
	handleSymptom = e => {
		let { id, value } = e.target;

		this.props.callbackQuestion([{
			id: id,
			choice_id: value
		}]);
	}

	render() {
		return (
			<Fragment>
				{this.props.items[0].choices.map((item) => 
					<button key={item.id} 
						id={this.props.items[0].id}
						value={item.id}
						onClick={this.handleSymptom}
						className="btn link-simple btn-lg btn-block mb-3">{item.label}</button>
				)}
			</Fragment>
		);
	}
}