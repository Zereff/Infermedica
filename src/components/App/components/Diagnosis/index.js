import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Conditions from './components/Conditions';
import Question from './components/Question';
import Api from '../../../../api';

class Diagnosis extends Component {
	constructor() {
		super();
    this.state = {
      diagnosis: {},
    }

    this.api = new Api();
	}

	initDiagnosis = () => {
    // let evidence = this.props.store.evidenceReducer;

    // let diagnosis = this.api.doDiagnosis(evidence);
    // diagnosis.then(item => {
    //   this.setState({
    //     diagnosis: item,
    //   });
    // });

    let diagnosis = this.api.fixtures.diagnosis;
    this.setState({
      diagnosis: diagnosis,
    });
    console.log(diagnosis);
	}

	updateDiagnosis = newEvidence => {
    this.props.onAddEvidence(newEvidence);
    let evidence = this.props.store.evidenceReducer.concat(newEvidence);
    console.log(evidence);

    let diagnosis = this.api.doDiagnosis(evidence);
    diagnosis.then(item => {
      this.setState({
        diagnosis: item,
      });
    });
	}

	componentWillMount() {
		this.initDiagnosis();
	}

	render() {
    let diagnosis = this.state.diagnosis;
    console.log(diagnosis);

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

const dispatchElement = dispatch => {
  return {
    onAddEvidence: evidence => {
      dispatch({ type: 'ADD_EVIDENCE', payload: evidence });
    }
  }
}

export default connect(mapStateToProps, dispatchElement)(Diagnosis);