import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Api from '../api'; 
import Search from './Search';
import List from './List';

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

    this.api = new Api();
  }

  updateSymptomList = e => {
    let inputValue = e.target.value.substr(0, 20);

    clearTimeout(timer);

    timer = setTimeout(() => {
      const result = this.api.search(inputValue, TYPE);
      result.then(items => {
        this.mapDataToEvidence(items);
      });

    }, REQUEST_TIMEOUT);
  }

  changeSymptom = target => {
    const { checked, id } = target;
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
              <Search callbackSymptomInput={this.updateSymptomList}
                placeholder="Headache" />
            </div>

            {!this.state.symptoms.length ? (
              <p className="lead">Tell us the symptom that's troubling you the most.</p>
            ) : (
              <Fragment>
                <div className="form-group">
                  {this.state.symptoms.map(symptom => <List item={symptom}
                    callbackItemList={this.changeSymptom}
                    key={symptom.id} />
                  )}
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