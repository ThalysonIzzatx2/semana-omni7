import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';
import './Feed.css';
// import { Container } from './styles';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';



export default class Feed extends Component {
  state = {
    feed: [],
  };
  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }
  async componentDidMount() {
    try {
      this.registerToSocket();
      const response = await api.get('/posts');
      this.setState({ feed: response.data });
      console.log(this.state.feed);
    } catch (err) {
      console.error(err);


    }
  }
  registerToSocket = () => {
    const socket = io('http://localhost:5451');

    //like, post

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });
    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post )
      })
    })
  }
  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className='user-info'>
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="mostrar mais" />
            </header>

            <img src={`http://localhost:5451/files/${post.image}`} alt="" />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="curtir" />
                </button>
                <img src={comment} alt="comentar" />
                <img src={send} alt="enviar" />
              </div>

              <strong>{post.likes} curtidas</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}
