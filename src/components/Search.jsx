import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = { 
      name: '',
      artistName: '',
      button: true,
      loading: false,
      album: [],
      resolved: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      name: value,
      button: this.enableButon(value),
    });
  }

  async handleSubmit(name) {
    this.setState({ loading: true, artistName: name }, async () => {
      const album = await searchAlbumsAPI(name);
      this.setState({
        loading: false,
        resolved: true,
        name: '',
        album,
      });
    });
  }

  enableButon = (name) => {
    if (name.length > 1) {
      return false;
    }
    return true;
  }

  renderAlbum() {
    const { album, artistName, resolved } = this.state;
    if (resolved && album.length > 0) {
      return (
        <>
          <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
          { album.map((singleAlbum) => (
            <div key={ singleAlbum.collectionId }>
              <Link
                data-testid={ `link-to-album-${singleAlbum.collectionId}` }
                to={ `/album/${singleAlbum.collectionId}` }
              >
                <h1>{singleAlbum.artistName}</h1>
                <h2>{singleAlbum.collectionName}</h2>
                <img
                  src={ singleAlbum.artworkUrl100 }
                  alt={ singleAlbum.collectionName }
                />
              </Link>
            </div>

          ))}
        </>
      );
    }
    return (<h2>Nenhum álbum foi encontrado</h2>);
  }

  render() {
    const { name, button, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
          <form>
            <input
              name="name"
              value={ name }
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ button }
              onClick={ () => this.handleSubmit(name) }
            >
              Pesquisar
            </button>
          </form>
          <div>
            { this.renderAlbum() }
          </div>
        </div>
      </>
    );
  }
}

export default Search;
