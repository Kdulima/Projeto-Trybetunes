import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

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

      <>
        <div data-testid="page-login">
          <h1>Login</h1>
        </div>
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ button.disabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
