import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import LoginNav from '../LoginNav/loginNav';
import './login.css';

class Login extends Component {
  static contextType = ApiContext;

  state = {
    error: null
  };

  updateUserInfo = (username, password) => {
    this.setState({
      username: username,
      password: password
    })
  }

  render() {

    const { username, password } = this.state;
    const { userNameError, passwordError, handleSignUp, handleLogin } = this.context;

    return (
      <div>
        <LoginNav />
        <form className="login-form">
          <legend><h2>Login</h2></legend>

            <div>
              <label className="login-label">User Name: </label>
              <input type="text" className="login-input" onChange={e => this.updateUserInfo(e.target.value, password)}></input>
              <div className="error">{userNameError}</div>
            </div>

            <div>
              <label className="login-label">Password: </label>
              <input type="password" className="login-input" onChange={e => this.updateUserInfo(username, e.target.value)}></input>
              <div className="error">{passwordError}</div>
            </div>

            <div className="sign-in">
              <button type="button" className="login-button" onClick={(e) => handleSignUp(e, username, password)}>Sign Up</button> | <button type="button" className="login-button" onClick={(e) => handleLogin(e, username, password)}>Login</button>
            </div>
        </form>
      </div>
    )
  }
}


export default Login;