import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Spinner from '../layout/Spinner';

import Moment from 'react-moment';

const queryString = require('query-string');

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    console.log(params.track_id);
    console.log(params.commontrack_id);
    // 1st req to get lyrics and 2nd req to get track info
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${params.track_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios
          .get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${params.commontrack_id}&apikey=${process.env.REACT_APP_MM_KEY}`
          )
          .then(res => {
            console.log(res.data);
            this.setState({ track: res.data.message.body.track });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    const { lyrics, track } = this.state;
    if (
      lyrics === undefined ||
      track === undefined ||
      Object.keys(lyrics).length === 0 ||
      Object.keys(track).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to='/' className='btn btn-info btn-sm mb-4'>
            Go back
          </Link>
          <div className='card'>
            <h5 className='card-header'>
              {track.track_name} by{' '}
              <span className='text-secondary'>{track.artist_name}</span>
            </h5>
            <div className='card-body'>
              <p className='card-text'>{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className='list-group mt-4'>
            <li className='list-group-item'>
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className='list-group-item'>
              <strong>Song Genre</strong>:{' '}
              {track.primary_genres.music_genre_list.length === 0
                ? 'No Available to Show'
                : track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name}
            </li>
            <li className='list-group-item'>
              <strong>Explicit Words</strong>:{' '}
              {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className='list-group-item'>
              <strong>Release Date</strong>:{' '}
              <Moment format='YYYY/MM/DD HH:mm'>{track.updated_time}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
