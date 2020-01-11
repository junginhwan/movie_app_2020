import React from 'react';
import axios from 'axios';
import './Detail.css';

class Detail extends React.Component {
  state = {
    title: '',
    description: '',
    large_image: '',
    rating: 0,
    like_count: 0,
    isLoading: true,
  };

  async getMovie() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id) {
      const {
        data: {
          data: { movie },
        },
      } = await axios.get(
        `https://yts.lt/api/v2/movie_details.json?movie_id=${id}`,
      );
      this.setState({
        title: movie.title,
        description: movie.description_full,
        large_image: movie.large_cover_image,
        rating: movie.rating,
        like: movie.like_count,
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    this.getMovie();
  }
  render() {
    return (
      <div className="detail__container">
        {this.state.isLoading ? 'Loading...' : ''}
        <div>
          <img src={this.state.large_image} alt={this.state.title}></img>
        </div>
        <div className="detail__textarea">
          <h3>{this.state.title}</h3>
          <ul>
            <li>
              {this.state.rating > 0 ? `rating : ${this.state.rating}` : null}
            </li>
            <li>{this.state.like > 0 ? `like : ${this.state.like}` : null}</li>
          </ul>
          <p>{this.state.description}</p>
        </div>
      </div>
    );
  }
}

export default Detail;
