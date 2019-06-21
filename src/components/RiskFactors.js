import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import commonRiskFactors from '../commonRiskFactors';

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

  changeRiskFactor = e => {
    const { checked, id } = e.target;
    const choiceId = checked ? 'present' : 'absent';

    this.setState(({mapRiskFactors}) => ({
      mapRiskFactors: mapRiskFactors.map(item => {
        if (id === item.id) {
          item.choice_id = choiceId
        }

        return item;
      })
    }));
  }

  componentWillMount() {
    this.mappingRiskFactors(this.state.riskFactors);
  }

  componentDidMount() {
    this.props.onAddRiskFactorList(this.state.mapRiskFactors);
  }

	render() {
		return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="lead">
              Risk-factors(e.g. smoking, insect bite or head injury)</p>

            {this.state.riskFactors.length > 0 &&
              <Fragment>
                <div className="form-group">
                  {this.state.riskFactors.map(riskFactor => (
                    <div className="form-check" key={riskFactor.id}>
                      <input type="checkbox"
                        id={riskFactor.id}
                        onChange={this.changeRiskFactor}
                        className="form-check-input" />

                      <label htmlFor={riskFactor.id}
                        className="form-check-label">
                        {riskFactor.name}
                      </label>
                    </div>
                  ))}
                </div>
                <Link className="link link-lg" to={`/diagnosis`}>Diagnose</Link>
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