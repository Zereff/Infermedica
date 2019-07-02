import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import commonRiskFactors from './commonRiskFactors';
import Nav from '../Nav';
import Avatar from '../Avatar';
import List from '../List';

class RiskFactors extends Component {
  constructor() {
		super();
    this.state = {
      riskFactors: commonRiskFactors,
      mapRiskFactors: [],
    };
  }
  
  componentWillMount() {
    this.mappingRiskFactors(this.state.riskFactors);
  }

  mappingRiskFactors = riskFactors => {
    this.setState({
      mapRiskFactors: riskFactors.map(item => {
        return {
          id: item.id,
          choice_id: 'absent'
        }
      })
    });
  }

  changeRiskFactor = target => {
    if(!target.checked) {
      this.addElement(target.id)
    } else {
      this.removeElement(target.id);
    }
  }

  addElement = id => {
    this.setState(({mapRiskFactors}) => ({
      mapRiskFactors: mapRiskFactors.filter(item => item.id === id)
    }));
  }

  removeElement = id => {
    this.setState(({mapRiskFactors}) => ({
      mapRiskFactors: [...mapRiskFactors, id]
    }));
  }

  addRiskFactorsToStore = () => {
    this.props.onAddEvidence(
      this.mapRiskFactorsToEvidence()
    );
  }

  mapRiskFactorsToEvidence = () => {
    return this.state.riskFactors.map(item => {
      let choiceId = this.state.mapRiskFactors.includes(item.id) ? 'present' : 'absent';

      return {
        id: item.id,
        choice_id: choiceId
      }
    });
  }

	render() {
    console.log(this.props.store);
		return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Nav />
						<div className="text-center mt-5 mb-5">
							<Avatar />
						</div>
            <p className="main text-center mb-10">Bellow you see the most common risk factors.
              Risk factors are very important before the actual interview begins.
              This helps to steer the interview in the right direction and to reduce its length.</p>

            {this.state.riskFactors.length > 0 &&
              <Fragment>
                <div className="form-group mt-5 mb-6">
                  {this.state.riskFactors.map(riskFactor => <List item={riskFactor}
                    callbackItemList={this.changeRiskFactor}
                    key={riskFactor.id} />
                  )}
                </div>
                <Link className="btn link-simple btn-lg btn-block"
                  to="/diagnosis"
                  onClick={this.addRiskFactorsToStore}>Continue</Link>
              </Fragment>
            }
          </div>
        </div>    
      </div>
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

export default connect(mapStateToProps, dispatchElement)(RiskFactors);