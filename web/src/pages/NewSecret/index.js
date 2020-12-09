import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

import { SecretForm } from '../../components';

import * as socket from '../../services/socket';
import { createSecret } from '../../services/dataAPI';

class NewSecret extends Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.stopCheckingForNewSecrets();
  }

  handleSubmit(secret) {
    if (secret.name === '') {
      secret.name = `Anônimo${parseInt(Math.random() * 100000)}`;
    }

    createSecret(secret).then((newSecret) => {
      socket.sendNewSecret(newSecret);
      this.setState({ shouldRedirect: true });
    });
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <section className="secret__form__container">
        <SecretForm onSubmit={this.handleSubmit} />
      </section>
    );
  }
}

export default NewSecret;
