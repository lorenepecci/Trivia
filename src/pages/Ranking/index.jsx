import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style.css';

export class Ranking extends Component {
  render() {
    const { history } = this.props;
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    return (
      <div className="container-ranking">
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          {
            sortedPlayers.map((player, index) => (
              <div className="item-section" key={ index }>
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                { ' - ' }
                <span data-testid={ `player-score-${index}` }>{ player.score }</span>
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Ranking;
