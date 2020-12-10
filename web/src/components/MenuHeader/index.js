import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class MenuHeader extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const activeLink = 'header__content header__content--active';
    const inactiveLink = 'header__content';

    return (
      <header className="header">
        <nav className="header__container">
          <Link
            to="/"
            className={pathname === '/' ? activeLink : inactiveLink}
          >
            <p className="header__content__link">Home</p>
          </Link>
          <Link
            to="/secret/new"
            className={pathname === '/secret/new' ? activeLink : inactiveLink}
          >
            <p className="header__content__link" to="/secret/new">New</p>
          </Link>
        </nav>
      </header>
    );
  }
}

export default MenuHeader;
