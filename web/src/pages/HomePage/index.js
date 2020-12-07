import React, { Component, createRef } from 'react';
import './style.css';

import {
  SecretCard,
  SecretsCount,
  MenuHeader,
  Loading,
} from '../../components';

import { getSecrets, getTotalSecrets } from '../../services/dataAPI';

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      secrets: [],
      loading: true,
      page: 1,
      totalSecrets: 1,
    };

    this.observer = createRef();

    this.lastSecret = node => {
      if (this.observer.current) this.observer.current.disconnect();
      this.observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.nextPage();
        }
      });
      if (node) this.observer.current.observe(node);
    };

    this.fetchSecrets = this.fetchSecrets.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    getTotalSecrets().then(totalSecrets => {
      this.setState(
        { totalSecrets },
        this.fetchSecrets,
      )
    });
  }

  fetchSecrets() {
    const { page } = this.state;
    getSecrets(page).then((secrets) => {
      this.setState(({ secrets: previousSecrets }) => ({
        secrets: [...previousSecrets, ...secrets],
        loading: false,
      }));
    });
  }

  nextPage() {
    const { page, totalSecrets } = this.state;
    const max_per_page = 5;
    if (totalSecrets > page * max_per_page) {
      this.setState(
        ({ page: previousPage }) => ({ page: previousPage + 1}),
        this.fetchSecrets,
      );
    }
  }

  render() {
    const { secrets, loading, totalSecrets } = this.state;
    return (
      <>
        <MenuHeader path={this.props.match.path} />
        <main className="secrets__container">
          <section className="secrets__content">
            {loading ? (
              <Loading />
            ) : (
              <>
                <SecretsCount totalSecrets={totalSecrets}/>
                {secrets.map((secret, index) => (
                    <SecretCard
                      key={secret.id}
                      secret={secret}
                      onRef={secrets.length === index + 1 ? this.lastSecret : null}
                    />
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
