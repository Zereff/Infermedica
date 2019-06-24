import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Api from '../../../../api'; 
import Nav from '../Nav';
import Avatar from '../Avatar';
import Search from '../Search';
import List from '../List';

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

    if (inputValue.length > 0) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const result = this.api.search(inputValue, TYPE);
        result.then(items => {
          this.mapDataToEvidence(items);
        });
  
      }, REQUEST_TIMEOUT);
    }
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

    this.props.onAddSymptomList(this.state.mapSymptoms);
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Nav />
            <div className="text-center mt-6 mb-8">
							<Avatar />
						</div>
            <p className="main text-center">
              Tell us the symptom that's troubling you.</p>
            <div className="form-group mt-5 mb-5">
              <Search callbackSymptomInput={this.updateSymptomList}
                placeholder="I have a headache" />
            </div>

            <p className="second text-center">We will try to recognize your symptoms 
                  using Natural Language Processing algorithms.</p>

            {this.state.symptoms.length > 0 &&
              <Fragment>
                <div className="form-group mt-6 mb-6">
                  {this.state.symptoms.map(symptom => <List item={symptom}
                    callbackItemList={this.changeSymptom}
                    key={symptom.id} />
                  )}
                </div>
                <Link className="btn link-simple btn-lg btn-block mb-3" to={`/risk-factors`}>Continue</Link>
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
    onAddSymptomList: symptoms => {
      dispatch({ type: 'ADD_SYMPTOMS', payload: symptoms });
    }
  }
}

export default connect(mapStateToProps, dispatchElement)(Symptoms);