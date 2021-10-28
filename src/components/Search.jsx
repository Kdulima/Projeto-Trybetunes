import React from 'react';
import Header from './Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      button: true,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      name: value,
      button: this.enableButton(value),
    });
  }

  handleSubmit() {
    return true;
  }

  enableButton = (name) => {
    if (name.length > 1) {
      return false;
    }
    return true;
  }

  render() {
    const { name, button, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <div data-testid="page-search">
          <Header />
          <h1>Search</h1>
        </div>
        <form>
          <input
            name="name"
            type="text"
            value={ name }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ button }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
