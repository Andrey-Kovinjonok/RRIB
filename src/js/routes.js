
import React from 'react';
import { Route } from 'react-router';

import * as containers from 'containers';

const {
  App,
  Login
} = containers;

export function getRoutes(store) {
  const requireAuth = (nextState, replaceState) => {
    const state = store.getState();
    if ((!state.user) || (!state.user.sessionToken)) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  };

  return [
    <Route path="/" component={App} onEnter={requireAuth}/>,
    <Route path="/login" component={Login}/>
  ];
}
