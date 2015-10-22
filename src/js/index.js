// polyfills
require('es6-promise').polyfill();
require('whatwg-fetch');

// normalize.css
// require('normalize.css');

// require your app here
require('debug-dude')('service').warn('require your app entry point plz');


import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { Provider } from 'react-redux';

import * as reduxStore from 'store';

import * as containers from 'containers';

// import * as Routes from './routes.js';

const store = reduxStore.createClientStore();

/*
import { createStore, applyMiddleware /* , bindActionCreators * / } from 'redux';
import parseComMiddleware from './redux/ParseComMiddleware.js';
const createStoreWithMiddleware = applyMiddleware(
  parseComMiddleware,
)(createStore);


const reducer = require('./store/LoginReducer.js');
const store = createStoreWithMiddleware(reducer); // , data);
// store.client = client;

// if (__DEVELOPMENT__ && module.hot) {
if (module.hot) {
  module.hot.accept('./store/LoginReducer.js', () => {
    store.replaceReducer(require('./store/LoginReducer.js'));
  });
}
/*
React.render(
    {() => <Root history={history} />}
, document.getElementById('app'));
+

*/

// const routes = Routes.getRoutes(store);

const {
  App,
  Login
} = containers;

const requireAuth = (nextState, replaceState) => {
  const state = store.getState();
  if ((!state.user) || (!state.user.sessionToken)) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};


const ReactApp = () => (
  <div>APP</div>
);

ReactDOM.render(

  <Provider store={store}>

    <Router history={ createBrowserHistory() }>
      <Route path="/" component={ReactApp}>
        <IndexRoute component={App} onEnter={requireAuth}/>,
        <Route path="/login" component={Login}/>
      </Route>
    </Router>

  </Provider>

, document.getElementById('react-app'));
