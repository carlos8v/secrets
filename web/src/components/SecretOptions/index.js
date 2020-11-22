import React, { Component } from 'react';
import { FaShare } from "react-icons/fa";

class SecretOptions extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    const { id } = this.props;
    navigator.clipboard.writeText(`${window.location.href}secret/${id}`);
    alert('Url copiada para área de trabalho');
  }
  render() {
    return <FaShare color='#b8bbbf' size={24} onClick={this.handleShare} style={{padding: 5}}/>;
  }
}

export default SecretOptions;