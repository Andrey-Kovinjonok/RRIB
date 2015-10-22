import { createStore, applyMiddleware, compose } from 'redux';
import promisedMiddleware from './PromisedMiddleware.js';

export default function createApiClientStore() {
  const finalCreateStore = compose(
    applyMiddleware(promisedMiddleware),
    // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

    // devTools(),
  /*
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(middleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  /*
  } else {
    finalCreateStore = applyMiddleware(middleware)(createStore);
  }
  */

  const reducer = require('store/LoginReducer.js');
  const store = finalCreateStore(reducer); // , data);
  // store.client = client;

  // if (__DEVELOPMENT__ && module.hot) {
  if (module.hot) {
    module.hot.accept('./LoginReducer.js', () => {
      store.replaceReducer(require('./LoginReducer.js'));
    });
  }
  return store;
}
