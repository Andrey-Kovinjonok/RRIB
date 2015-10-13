// polyfills
require('es6-promise').polyfill();
require('whatwg-fetch');

// normalize.css
// require('normalize.css');

// require your app here
require('debug-dude')('service').warn('require your app entry point plz');


import React from 'react';
// import { Provider } from 'react-redux'

/*
React.render(
  <Provider store={store}>
    {() => <Root history={history} />}
  </Provider>
, document.getElementById('app'));
*/

React.render(
  <div>
    <h1>
      SAMPLE TO 1 TEST
    </h1>
  </div>
, document.getElementById('app'));
