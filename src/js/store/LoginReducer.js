import { LOG_IN, LOG_OUT } from './InitActions.js';

const initialState = {
  data: {},
  user: undefined,
  sessionToken: undefined
};

export default function todoReducer(state = initialState, action) {
  console.log('todoReducer:', state, action);
  switch (action.type) {

  case LOG_IN:
    return {
      ...state,
      user: action.user
    };

  case LOG_OUT:
    return {
      ...state,
      user: undefined // user: action.user
    };

  default:
    return state ? state : initialState;
  }
}
