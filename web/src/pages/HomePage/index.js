import React, { Component } from 'react';
import './style.css';

import {
  SecretCard,
  SecretsCount,
  MenuHeader,
  Loading,
} from '../../components';

import { getSecrets } from '../../services/dataAPI';

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      secrets: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchSecrets();
  }

  fetchSecrets() {
    getSecrets().then((secrets) => this.setState({ secrets, loading: false }));
  }

  render() {
    const { secrets, loading } = this.state;
    return (
      <>
        <MenuHeader path={this.props.match.path} />
        <main className="secrets__container">
          <section className="secrets__content">
            {loading ? (
              <Loading />
            ) : (
              <>
                <SecretsCount />
                {secrets.map((secret) => (
                  <SecretCard key={secret.id} secret={secret} />
                ))}
              </>
            )}
          </section>
        </main>
      </>
    );
  }
}

export default HomePage;
