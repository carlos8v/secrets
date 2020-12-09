import React, { Component, createRef } from 'react';
import './style.css';

import {
  SecretCard,
  SecretsCount,
  Loading,
} from '../../components';

import * as socket from '../../services/socket';
import { getSecrets, getPagination } from '../../services/dataAPI';

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      secrets: [],
      loading: true,
      page: 1,
      total: 1,
      lastPage: 1,
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
  }

  componentDidMount() {
    this.updatePagination(this.fetchSecrets);
  }

  componentWillUnmount() {
    socket.stopCheckingForNewSecrets();
  }

  updatePagination(callback) {
    getPagination().then(({ total, lastPage }) => {
      this.setState(
        { total, lastPage },
        callback,
      )
    });
  }

  fetchSocketSecret(socketSecret) {
    this.updatePagination(() => {
      this.setState(({ secrets: previousSecrets}) => ({
        secrets: [socketSecret, ...previousSecrets],
      }));
    });
  }

  fetchSecrets() {
    const { page } = this.state;
    const unique = (unique, item) =>
      unique.find(({ id }) => id === item.id) ? unique : [...unique, item];

    getSecrets(page).then(({ data: secrets }) => {
      this.setState(
        ({ secrets: previousSecrets }) => ({
          secrets: [...previousSecrets, ...secrets].reduce(unique, []),
          loading: false,
        }),
        () => {
          socket.stopCheckingForNewSecrets();
          socket.checkForNewSecrets((socketSecret) => {
            this.fetchSocketSecret(socketSecret);
          })
        },
      );
    });
  }

  nextPage() {
    const { page, lastPage } = this.state;
    if (page < lastPage) {
      this.setState(
        ({ page: previousPage }) => ({ page: previousPage + 1}),
        this.fetchSecrets,
      );
    }
  }

  render() {
    const { secrets, loading, total } = this.state;
    return (
      <main className="secrets__container">
        <section className="secrets__content">
          {loading ? (
            <Loading />
          ) : (
            <>
              <SecretsCount total={total} />
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
    );
  }
}

export default HomePage;
