import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../../reducers';
import Home from './components/Home';
import Symptoms from './components/Symptoms';
import RiskFactors from './components/RiskFactors';
import Diagnosis from './components/Diagnosis';
import Doctor from './components/Diagnosis/components/Conditions/components/Doctor';

const App = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/symptoms" component={Symptoms} />
          <Route exact path="/risk-factors" component={RiskFactors} />
          <Route exact path="/diagnosis" component={Diagnosis} />
          <Route path="/doctors/:id" component={Doctor} />
      </Router>
    </Provider>
  );
}

export default App;