import React, { Component } from 'react';
import './style.css';

class Loading extends Component {
  render() {
    return(
      <div className="loading__container">
        <h2 className="loading">Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
