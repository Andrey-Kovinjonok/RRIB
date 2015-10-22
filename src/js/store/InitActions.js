import { LoginAPI } from 'api';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function login(user, pass) {
  return {
    type: LOG_IN,
    // promise: LoginAPI.API.login(user, pass),
    onSuccess: (result)=>({
      user: {
        ...result
      }
    }),
    onFail: (err) => {
      console.log('Autentification error: ', err);
      return err;
    }
  };
}

export function logout(sessionToken) {
  return {
    type: LOG_OUT,
    // promise: parseCom.API.logout(sessionToken),
    // promise: LoginAPI.API.logout(sessionToken),
    onSuccess: () => ({
      user: undefined
    }),
    onFail: (err) => {
      console.log('Autentification error: ', err);
      return err;
    }
  };
}
