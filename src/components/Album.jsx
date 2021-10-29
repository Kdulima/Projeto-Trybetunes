import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      nameAlbum: '',
      musicAlbum: [],
    };
  }

  componentDidMount() {
    this.musicList();
  }

  async musicList() {
    const { match } = this.props;
    const list = await getMusics(match.params.id);
    this.setState({
      artistName: list[0].artistName,
      nameAlbum: list[0].collectionName,
      musicAlbum: list,
    });
  }

  render() {
    const { artistName, nameAlbum, musicAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h2 data-testid="album-name">
          { nameAlbum }
        </h2>
        {
          musicAlbum.map((music, i) => {
            if (i > 0) {
              return <MusicCard key={ music.trackId } music={ music } />;
            }
            return true;
          })
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
