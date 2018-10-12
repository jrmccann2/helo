import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Nav extends Component {
  
  render (){

    const { username, profile_pic } = this.props;
    
    return (
      <div className="Nav">
        <h1>{username}</h1>
        <img src={profile_pic} alt="profile_pic"/>
        <Link to='/dashboard'>
          <button>Home</button>
        </Link>
        <Link to='/new'>
          <button>New Post</button>
        </Link>
        <Link to='/'>
          <button>Logout</button>
        </Link>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
      username: state.username,
      profile_pic: state.profile_pic
  }
}

export default connect (mapStateToProps)(Nav);