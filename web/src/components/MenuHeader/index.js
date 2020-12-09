import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class MenuHeader extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const activeLink = 'header__content header__content--active';
    const inactiveLink = 'header__content__link';

    return (
      <header className="header">
        <nav className="header__container">
          <div className={pathname === '/' ? activeLink : inactiveLink}>
            <Link className="header__content__link" to="/">
              Home
            </Link>
          </div>
          <div className={pathname === '/secret/new' ? activeLink : inactiveLink}>
            <Link className="header__content__link" to="/secret/new">
              New
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default MenuHeader;
