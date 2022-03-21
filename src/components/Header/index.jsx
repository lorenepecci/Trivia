import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';

class Header extends Component {
  render() {
    const { score, name } = this.props;
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const playerData = players.find((player) => player.name === name) || {};
    return (
      <div className="container-header">
        <img data-testid="header-profile-picture" src={ playerData.picture } alt="" />
        <h5 data-testid="header-player-name">{playerData.name}</h5>
        <p>
          Score:
          {' '}
          <span data-testid="header-score">
            {score}
          </span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
});

Header.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
