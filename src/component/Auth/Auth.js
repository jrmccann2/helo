import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import updateUserInformation from '../../ducks/reducer';

class Auth extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  login (){
    let {username, password} = this.state
    axios.post('/api/auth/login', {username, password})
        .then( res => {
          const {id, username, profile_pic} = res.data
          updateUserInformation(id, username, profile_pic)
        })
  }

  register(){
    let {username, password} = this.state
    axios.post('/api/auth/register', {username, password})
        .then(res => {
          const {id, username, profile_pic} = res.data
          updateUserInformation(id, username, profile_pic)
        })
  }

  render() {
    return (
      <div className="Auth">
        Auth
        <p>
            Username:
            <input type="text" placeholder="Username" name='username' onChange={this.handleInput} />
        </p>
        <p>
            Password:
            <input type="text" placeholder="Password" name='password' onChange={this.handleInput} />
        </p>
        <Link to='/dashboard'><button className='btn' onClick={this.register}>Register</button></Link>
        <Link to='/dashboard'><button className='btn' onClick={this.login}>Login</button></Link>
      </div>
    );
  }
}

export default connect ( null, {updateUserInformation} )( Auth );