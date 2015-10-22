/*
import fetch from 'isomorphic-fetch';

"server_request": "http://192.168.1.5"

fetch(serverRequest + serverPort + action.request)
      .then( (result) => {
        return result.json();
      }),
*/
let instance = null;

export default class LoginService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  static get API() {
    let api = instance;
    if (!api) {
      api = new LoginService();
    }
    return api;
  }

  login(user, pass) {
    return new Promise((resolve, reject) => {
      if ((user === 'user1') && (pass === 'usergate1s')) {
        resolve({ user, pass, ['access']: true });
      } else {
        reject('invalid login/password');
      }
      // return self.parseAPI.Parse.User.logIn(user, pass, {
      /*  success: (users) => (resolve(users)),
        error: () => (reject([]))
      });*/
    });
  }

  logout(userTocken) {
    return new Promise((resolve, reject) => {
      if (userTocken === 'user1usergate1s') {
        resolve(true);
      } else {
        reject('invalid user tocken!');
      }
    });
  }
}
