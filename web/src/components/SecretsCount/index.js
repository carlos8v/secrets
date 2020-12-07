import React, { Component } from 'react';
import './style.css';

class SecretsCount extends Component {
  render() {
    const { totalSecrets } = this.props;
    return(
      <article className="secrets__count__container">
        <h3 className="secrets__count__title">Nossos Desabafos:</h3>
        <h2 className="secrets__count">{totalSecrets}</h2>
      </article>
    );
  }
}

export default SecretsCount;
