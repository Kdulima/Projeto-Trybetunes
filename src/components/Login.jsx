/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirectForSearch: false,
      button: true,
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

  async handleSubmit() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      loading: false,
      redirectForSearch: true,
    });
  }

  enableButton = (name) => {
    const minLength = 3;
    if (name.length >= minLength) {
      return false;
    }
    return true;
  }

  render() {
    const { name, button, loading, redirectForSearch } = this.state;
    if (loading) return <Loading />;
    if (redirectForSearch) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        <div className="login__page__container">
          <h2>
            <span>T</span>
            <span>R</span>
            <span>Y</span>
            <span>B</span>
            <span>E</span>
            <span>T</span>
            <span>U</span>
            <span>N</span>
            <span>E</span>
            <span>S</span>
          </h2>
          <form className="login__page__form">
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="login-name-input"
              onChange={ this.handleChange }
              id="inputName"
              className="login__page__inputName"
              placeholder="Digite o seu nome"
            />
            <div className="login__page__container__button">
              <div className="login__page__btn">
                <a
                  href="#btn-submit"
                  onClick={ this.handleSubmit }
                  disabled={ button }
                >
                  ENTRAR
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
