import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NotFound, MenuHeader } from './components';
import { HomePage, NewSecret, SecretDetails } from './pages';

import * as socket from './services/socket';

class App extends Component {
  componentDidMount() {
    socket.connect();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route component={MenuHeader} />
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
