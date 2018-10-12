import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      posts: [],
      search: '',
      userposts: true
    }
    this.handleInput = this.handleInput.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  getPosts(){
    axios.get(`/api/posts/${this.props.id}`)
  }

  resetSearch(){

  }

  render() {

    let posts = this.state.posts.map( (post, i) => {
      return (
        <div className='post-display' key={i}>
          <p>{post.title}</p>
          <p>{post.author}</p>
          <p>{post.profile_pic}</p>
        </div>
      )
    })

    return (
      <div className="Dashboard">
        Dashboard
        <input type="text" placeholder="Search" name='search' onChange={this.handleInput} />
        <button className='btn' onClick={this.getPosts}>Search</button>
        <button className='btn' onClick={this.resetSearch}>Reset</button>
        <input type="checkbox" name='userposts' value={!this.state.userposts} onClick={this.handleInput} />
        {posts}
      </div>
    );
  }
}

export default Dashboard;