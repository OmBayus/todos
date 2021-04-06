import React from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from './contexts/context';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
