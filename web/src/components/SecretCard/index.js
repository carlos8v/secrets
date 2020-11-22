import React, { Component } from 'react';
import './style.css';

import SecretOptions from '../SecretOptions';

class SecretCard extends Component {
  render() {
    const { id, name, secret } = this.props.secret;
    const randomColor = () => ((Math.random() * 0xffffff) << 0).toString(16);
    const avatar = `https://ui-avatars.com/api/?name=${name}&background=${randomColor()}&color=fff`;

    return (
      <article className="secret__card">
        <header className="secret__card__header__container">
          <div className="secret__card__header__content">
            <img alt="thumbnail" src={avatar} className="secret__card__header__avatar" />
            <span className="secret__card__header__name">{name}</span>
          </div>
          <SecretOptions id={id}/>
        </header>
        <main className="secret__card__content">
          <p>{secret}</p>
        </main>
      </article>
    );
  }
}

export default SecretCard;
