import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../reducers';
import Home from './Home';
import Symptoms from './Symptoms';
import RiskFactors from './RiskFactors';
import Diagnosis from './Diagnosis';

const App = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/symptoms' component={Symptoms} />
          <Route exact path='/risk-factors' component={RiskFactors} />
          <Route exact path='/diagnosis' component={Diagnosis} />
      </Router>
    </Provider>
  );
}

export default App;