import React, { Fragment } from 'react';
import Avatar from '../Avatar';
import './Nav.css';

const Nav = ({options}) => {
  return (
    <header className="mt-2">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">
          {'doctor' === options ? (
            <Fragment>
              <div className="marker"></div>
              <div className="find-text">Show all doctors near me</div>
            </Fragment>
          ) : (
            <Fragment>
              {'avatar' === options && 
                <Avatar size="s" />
              }
              Hi Alex
            </Fragment>
          )}
        </a>
        <button className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </header>
  );
}

export default Nav;