import React, { Component } from 'react';
import Nav from '../../../Nav';
import Avatar from '../../../Avatar';
import Single from './components/Single';
import GroupSingle from './components/GroupSingle';
import GroupMultiple from './components/GroupMultiple';

export default class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			symptoms: [],
			newSymptoms: [],
		};
	}

	handleQuestion = newSymptoms => {
		this.props.callbackDiagnosis(newSymptoms);
	}

	render() {
		let question = this.props.question;
		let questionType;

		switch (question.type) {
			case 'single':
				questionType = <Single items={question.items} callbackQuestion={this.handleQuestion} />;
				break;
			case 'group_single':
				questionType = <GroupSingle items={question.items} callbackQuestion={this.handleQuestion} />;
				break;
			case 'group_multiple':
				questionType = <GroupMultiple items={question.items} callbackQuestion={this.handleQuestion} />;
				break;
			default:
		}

		return (
      <div className="container">
        <div className="row">
          <div className="col">
						<Nav />
						<div className="text-center mt-5 mb-5">
							<Avatar />
						</div>
						<p className="main text-center mb-10">{question.text}</p>
						{questionType}
					</div>	
				</div>
			</div>
		);
	}
}