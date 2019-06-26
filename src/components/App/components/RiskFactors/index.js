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
    const { checked, id } = target;
    const choiceId = checked ? 'present' : 'absent';

    this.setState(({mapRiskFactors}) => ({
      mapRiskFactors: mapRiskFactors.map(item => {
        if (id === item.id) {
          item.choice_id = choiceId
        }

        return item;
      })
    }));

    this.props.onAddRiskFactorList(this.state.mapRiskFactors);
  }

  componentWillMount() {
    this.mappingRiskFactors(this.state.riskFactors);
  }

	render() {
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
                <Link className="btn link-simple btn-lg btn-block" to={`/diagnosis`}>Continue</Link>
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
    onAddRiskFactorList: riskFactors => {
      dispatch({ type: 'ADD_RISK_FACTORS', payload: riskFactors });
    }
  }
}

export default connect(mapStateToProps, dispatchElement)(RiskFactors);