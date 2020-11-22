import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NotFound } from './components';
import { HomePage, NewSecret, SecretDetails } from './pages';

class App extends Component {
  render() {
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/secret/new" component={NewSecret} />
            <Route exact path="/secret/:id" component={SecretDetails} />
            <Route component={NotFound} />
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
