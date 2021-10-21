import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    this.setState({ loading: true });
    const userName = await getUser();
    this.setState({
      loading: false,
      name: userName.name,
    });
  }

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
