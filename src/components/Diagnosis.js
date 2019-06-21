import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import settings from '../settings';
import Conditions from './Conditions';
import Question from './Question';

const ls = localStorage;

class Diagnosis extends Component {
	constructor() {
		super();
    this.state = {
      diagnosis: {},
      evidence: [],
    }
	}

	initDiagnosis = async () => {
  	let symptomsCollection = this.props.store.symptomsReducer
      .concat(this.props.store.riskFactorsReducer)
      .map(item => {
        item['initial'] = true;
        return item;
      });

    // use local storage in case of redux storage is empty
    if (!symptomsCollection.length) {
      symptomsCollection = JSON.parse(ls.getItem('symptomsCollection'));
    } else {
      ls.setItem('symptomsCollection', JSON.stringify(symptomsCollection));
    }

    this.getDiagnosis(symptomsCollection);
	}

  getDiagnosis = async (evidence) => {
    const responseDiagnosis = await fetch(`https://api.infermedica.com/v2/diagnosis`, {
      method: 'POST',
      headers: settings.headers,
      body: JSON.stringify({
        "sex": "male",
        "age": 30,
        "evidence": evidence
      })
    });

    this.setState({
      diagnosis: (await responseDiagnosis.json()),
      evidence: evidence
    });
  }

	updateDiagnosis = newSymptoms => {
    let symptomsCollection = JSON.parse(
      ls.getItem('symptomsCollection')
    ).concat(newSymptoms);
    
    ls.setItem('symptomsCollection', JSON.stringify(symptomsCollection));

    this.getDiagnosis(symptomsCollection);
	}

	componentWillMount() {
		this.initDiagnosis();
	}

	render() {
		let diagnosis = this.state.diagnosis;

		return(
      <Fragment>
				{Object.keys(diagnosis).length > 0 
					&& diagnosis.question !== null &&
					<Fragment>
            {!diagnosis.should_stop ? (
						  <Question question={diagnosis.question} callbackDiagnosis={this.updateDiagnosis} />
            ) : (
              <Conditions conditions={diagnosis.conditions} />
            )}
					</Fragment>
				}
      </Fragment>
		);
	}
}

const mapStateToProps = state => {
  return {
    store: state
  }
}

export default connect(mapStateToProps)(Diagnosis);