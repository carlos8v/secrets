import React, { Component } from 'react';
import './style.css';

import { getSecretsCount } from '../../services/dataAPI';

class SecretsCount extends Component {
  constructor() {
    super();
    this.state = {
      secretsCount: 0,
    };
  }
  
  componentDidMount() {
    getSecretsCount().then((secretsCount) => this.setState({ secretsCount }));
  }
  render() {
    const { secretsCount } = this.state;
    return(
      <article className="secrets__count__container">
        <h3 className="secrets__count__title">Nossos Desabafos:</h3>
        <h2 className="secrets__count">{secretsCount}</h2>
      </article>
    );
  }
}

export default SecretsCount;
