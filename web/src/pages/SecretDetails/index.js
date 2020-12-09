import React, { Component } from 'react';
import './style.css';

import { SecretCard, Loading, NotFound } from '../../components';

import { getSecret } from '../../services/dataAPI';

class SecretDetails extends Component {
  constructor() {
    super();
    this.state = {
      secret: {
        id: 0,
        name: '',
        secret: '',
      },
      loading: true,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchSecret(id);
  }

  fetchSecret(id) {
    getSecret(id).then((secret) => this.setState({ secret, loading: false }));
  }
  render() {
    const { loading, secret } = this.state;
    return(
      <>
        {loading ? (<Loading />) : (
          <section className="secret__details">
            {secret ? <SecretCard secret={secret} /> : <NotFound />}
          </section>
        )}
      </>
    );
  }
};

export default SecretDetails;
