import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import settings from '../settings';

const TYPE = 'symptom';
const REQUEST_TIMEOUT = 500;
var timer = null;

class Symptoms extends Component {
  constructor() {
    super();
    this.state = {
      symptoms: [],
      mapSymptoms: [],
    };
  }

  updateSymptomList = e => {
    let inputValue = e.target.value.substr(0, 20);

    clearTimeout(timer);

    timer = setTimeout(() => {
      this.search(inputValue, TYPE);
    }, REQUEST_TIMEOUT);
  }

  changeSymptom = e => {
    const { checked, id } = e.target;
    const choiceId = checked ? 'present' : 'absent';

    this.setState(state => ({
      mapSymptoms: state.mapSymptoms.map(item => {
        if (id === item.id) {
          item.choice_id = choiceId
        }

        return item;
      })
    }));
  }

  search = async (key, type) => {
    const response = await fetch(`https://api.infermedica.com/v2/search?phrase=${key}` +
      `&sex=male&max_results=5&type=${type}`, {
      method: 'GET',
      headers: settings.headers
    });

    this.mapDataToEvidence(await response.json());
  }

  mapDataToEvidence = searchResult => {
    this.setState({
      symptoms: searchResult,
      mapSymptoms: searchResult.map(item => {
        return {
          id: item.id,
          choice_id: 'absent'
        }
      })
    });
  }

  componentDidMount() {
    this.props.onAddSymptomList(this.state.mapSymptoms);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>What's troubling you?</h4>
            
            <div className="form-group">
              <input type="text"
                placeholder="Headache"
                onChange={this.updateSymptomList}
                className="form-control" />
            </div>

            {!this.state.symptoms.length ? (
              <p className="lead">Tell us the symptom that's troubling you the most.</p>
            ) : (
              <Fragment>
                <div className="form-group">
                  {this.state.symptoms.map(symptom => (
                    <div className="form-check" key={symptom.id}>
                      <input type="checkbox"
                        id={symptom.id}
                        onChange={this.changeSymptom}
                        className="form-check-input" />

                      <label htmlFor={symptom.id}
                        className="form-check-label">
                        {symptom.label}
                      </label>
                    </div>
                  ))}
                </div>
                <Link className="link link-lg" to={`/risk-factors`}>Symptom assessment</Link>
              </Fragment>
            )}
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
    onAddSymptomList: symptoms => {
      dispatch({ type: 'ADD_SYMPTOMS', payload: symptoms });
    }
  }
}

export default connect(mapStateToProps, dispatchElement)(Symptoms);