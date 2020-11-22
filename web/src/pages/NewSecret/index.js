import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

import { SecretForm, MenuHeader } from '../../components'

import { createSecret } from '../../services/dataAPI';

class NewSecret extends Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(secret) {
    if (secret.name === '') {
      secret.name = `Anônimo${parseInt(Math.random() * 100000)}`;
    }
    createSecret(secret).then(() => this.setState({ shouldRedirect: true }));
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />
    }

    return (
      <>
        <MenuHeader path={this.props.match.path} />
        <section className="secret__form__container">
          <SecretForm onSubmit={this.handleSubmit} />
        </section>
      </>
    );
  }
}

export default NewSecret;
