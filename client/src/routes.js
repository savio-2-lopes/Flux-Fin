import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Componentes
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import Kambam from './components/pages/Kambam';
import Login from './components/pages/Login';
import Alert from './components/utils/Alert';
// Redux 
import store from './store';
import { Provider } from 'react-redux';
// Rotas
export default function Routes() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/kambam/:id' component={Kambam} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}