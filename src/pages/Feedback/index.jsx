import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import './style.css';

export class Feedback extends Component {
  render() {
    const { history, assertions, score } = this.props;
    const numbersAssertions = 3;

    return (

      <div>
        <Header />
        <main className="container-feedback">
          <div className="totalQuestion">
            <p>
              Você acertou
              {' '}
              { '  ' }
              <span data-testid="feedback-total-question">
                {assertions}
              </span>
              {assertions === 1 ? ' questão ' : ' questões '}
            </p>
          </div>
          <p className="text" data-testid="feedback-text">
            {assertions < numbersAssertions ? 'Could be better...' : 'Well Done!'}
          </p>
          <div className="totalScore">
            <p>Total Score:</p>
            <p data-testid="feedback-total-score">{score}</p>
          </div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>

          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </main>
      </div>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps, null)(Feedback);
