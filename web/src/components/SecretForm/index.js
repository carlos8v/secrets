import React, { Component } from 'react';
import './style.css';

class SecretForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      secret: '',
      isValid: false,
    };

    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field, value) {
    this.setState({ [field]: value }, () => {
      const isValid = this.state.secret !== '';
      this.setState({ isValid });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const { name, secret, isValid } = this.state;
    const validClass = 'secret__form__submit secret__form__submit--valid';
    const invalidClass = 'secret__form__submit';

    return (
      <form className="secret__form" onSubmit={this.handleSubmit}>
        <div className="secret__form__block">
          <h2 className="secret__form__block__title">Desabafe conosco</h2>
        </div>
        <div className="secret__form__block">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            placeholder="Anônimo123"
            value={name}
            maxLength={24}
            onChange={(e) => this.updateField('name', e.target.value)}
          />
        </div>
        <div className="secret__form__block">
          <label htmlFor="secret">Desabafo:</label>
          <textarea
            rows={6}
            required={true}
            id="secret"
            value={secret}
            maxLength={256}
            onChange={(e) => this.updateField('secret', e.target.value)}
          />
        </div>
        <button className={isValid ? validClass : invalidClass} type="submit">
          Enviar
        </button>
      </form>
    );
  }
}

export default SecretForm;
