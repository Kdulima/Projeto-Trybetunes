import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addToFavorites = this.addToFavorites.bind(this);
    this.loadToFavorites = this.loadToFavorites.bind(this);

    this.state = {
      loading: false,
      favoritedMusic: false,
    };
  }

  componentDidMount() {
    this.loadToFavorites();
  }

  addToFavorites = async ({ target }) => {
    const { music } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(music);
      this.setState({ favoritedMusic: true, loading: false });
    } else {
      await removeSong(music);
      this.setState({
        favoritedMusic: false,
        loading: false,
      });
    }
  }

  async loadToFavorites() {
    const { music } = this.props;
    const favoritedMusicList = await getFavoriteSongs();
    if (favoritedMusicList
      .some((favoritedMusic) => favoritedMusic.trackId === music.trackId)) {
      this.setState({ favoritedMusic: true });
    }
  }

  render() {
    const { music } = this.props;
    const { loading, favoritedMusic } = this.state;
    return (
      loading ? <Loading /> : (
        <div>
          <p>{music.trackName}</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ music.trackId }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${music.trackId}` }
              checked={ favoritedMusic }
              id={ music.trackId }
              onChange={ this.addToFavorites }
            />
          </label>
        </div>
      )
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.string,
  }).isRequired,
};
