

import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import * as parseComActions from './../redux/ParseComActions.js';

import style from './login.styl');

@connect(
  state => ({ users: state.users, user: state.user }),
  dispatch => bindActionCreators(parseComActions, dispatch)
)
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUnknownUser: true,
      typedUser: ''
    };
  }

  static propTypes = {
    users: PropTypes.array,
    user: PropTypes.object,
    dispatch: PropTypes.object,
    signUp: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSignUp() {
    /*let { signUp } = this.props;
    const username = this.refs.username.getDOMNode().value;
    const password = this.refs.password.getDOMNode().value || '';
    signUp({ username, password});*/
  }

  handleLogIn() {
    /*let { login } = this.props;
    const username = this.refs.username.getDOMNode().value;
    const password = this.refs.password.getDOMNode().value || '';
    login({ username, password });*/
  }

  handleLogOut() {
    /*let { user, logout } = this.props;
    logout(user.sessionToken);*/
  }

  handleInputUser(event) {
    /*event.preventDefault();
    let { users } = this.props;
    let nameOfUser = event.target.value;
    let filteredUsers = users.filter(user =>
      (user.attributes.username === nameOfUser)
    );

    this.setState({ typedUser: nameOfUser });
    if (filteredUsers.length === 0) {
      this.setState({ isUnknownUser: true });
    } else {
      this.setState({ isUnknownUser: false });
    }*/
  }

  render() {
    const { user } = this.props;
    const { isUnknownUser, typedUser } = this.state;

    const username = typedUser || '';
    const notHasUsername = (username.trim().length === 0);

    return (
      <div className={'login container' }>

        <h1>Login</h1>

        { !user &&
        <div className='login'>

          <input className='login--edit'
                 type='text'
                 placeholder='username'
                 ref='username'
                 onChange={::this.handleInputUser} />

          <input className='login--edit'
                 type='text'
                 placeholder='password'
                 ref='password' />

          <button className="btn"
                  disabled={!isUnknownUser || notHasUsername}
                  onClick={::this.handleSignUp}>
            Sign Up
          </button>

          <button className="btn"
                  disabled={isUnknownUser || notHasUsername}
                  onClick={::this.handleLogIn}>
            Log In
          </button>

        </div>
        }

        { user &&
        <div>
          <p>You are currently logged in as {user.username}.</p>
          <div>
            <button className='btn btn-danger' onClick={::this.handleLogOut}>
              Log Out
            </button>
          </div>
          <Link to={'/'}> TODO </Link>
        </div>
        }
      </div>
    );
  }
}
