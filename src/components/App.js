import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

import axios from 'axios';
import Post from '../components/Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then((response)=>{
      this.setState({posts:response.data})
    });
  }

  updatePost(id,text) {
    console.log(text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text }).then((response)=>{
      this.setState({posts:response.data})
    })
  }


  deletePost(id) {
    // axios.delete(`http://practiceapi.devmountain.com`).then((response)=>{
    //   this.setState({posts: response.data});
    // })
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then((response)=>{
      this.setState({posts:response.data})
    });

  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text}).then((response)=>{
      this.setState({posts: response.data});
    })
  }
  filterPost=(text)=>{
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`).then(res=>{
      this.setState({posts:res.data});
      // console.log(this.state.posts)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header
        posts={this.state.posts}
        filterPostFn={this.filterPost}
        />

        <section className="App__content">

          <Compose createPostFn= {this.createPost}/>
          
          {posts.map((element)=>(
            
            <Post key = {element.id}
                  text={element.text}
                  date={element.date} 
                  id= {element.id} 
                  updatePostFn= {this.updatePost} 
                  deletePostFn= {this.deletePost}      
            /> 
          ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
