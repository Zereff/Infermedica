import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Api from '../../../../api'; 
import Nav from '../Nav';
import Avatar from '../Avatar';
import Search from '../Search';
import List from '../List';

const TIMEOUT = 500;
let timer = null;

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
    let input = e.target.value.substr(0, 20);

    clearTimeout(timer);
    timer = setTimeout(() => {

      this.api.searchSymptoms(input)
        .then(items => {
          this.setState({
            symptoms: items
          });
        });

    }, TIMEOUT);
  }

  changeSymptom = target => {
    if(!target.checked) {
      this.addElement(target.id)
    } else {
      this.removeElement(target.id);
    }
  }

  addElement = id => {
    this.setState(({mapSymptoms}) => ({
        mapSymptoms: mapSymptoms.filter(item => item.id === id)
    }));
  }

  removeElement = id => {
    this.setState(({mapSymptoms}) => ({
      mapSymptoms: [...mapSymptoms, id]
    }));
  }

  addSymptomsToStore = () => {
    this.props.onAddEvidence(
      this.mapSymptomsToEvidence()
    );
  }

  mapSymptomsToEvidence = () => {
    return this.state.symptoms.map(item => {
      let choiceId = this.state.mapSymptoms.includes(item.id) ? 'present' : 'absent';

      return {
        id: item.id,
        choice_id: choiceId,
        initial: true
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
            <p className="main text-center mb-5">
              Tell us the symptom that's troubling you.</p>

            <div className="form-group">
              <Search callbackSymptomInput={this.updateSymptomList}
                placeholder="I have a headache" />
            </div>
            
            <p className="second text-center mt-4">We will try to recognize your symptoms 
              using Natural Language Processing algorithms.</p>

            {this.state.symptoms.length > 0 &&
              <Fragment>
                <div className="form-group mt-5 mb-6">
                  {this.state.symptoms.map(symptom => <List item={symptom}
                    callbackItemList={this.changeSymptom}
                    key={symptom.id} />
                  )}
                </div>
                <Link className="btn link-simple btn-lg btn-block"
                  to="/risk-factors"
                  onClick={this.addSymptomsToStore}>Continue</Link>
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

export default connect(mapStateToProps, dispatchElement)(Symptoms);