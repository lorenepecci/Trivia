import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Questions from '../../components/Questions';
import { setAssertionAction, setScoreAction } from '../../redux/actions/setPlayerAction';
import setTokenAction from '../../redux/actions/setTokenAction';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      question: {},
      score: 0,
      assertions: 0,
      questionAtual: 0,
      timer: 30,
      listOptions: [],
      backClassNormal: true,
      isvisiblenextbtn: 'none',
      idTimer: 0,
      percentageForSecond: 3.333333333333,
      timePercent: 100,
      buttonDisabled: false,
    };
  }

  componentDidMount = () => {
    const { token } = this.props;
    this.fetchQuestionsToken(token);
  }

    fetchQuestionsToken = async (token) => {
      let json = {};
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
        json = await response.json();
        const codeFailResponse = 3;
        if (json.response_code === codeFailResponse) {
          throw new Error('Erro catch');
        }
      } catch (error) {
        const { fetchToken } = this.props;
        await fetchToken();
        const newToken = JSON.parse(localStorage.getItem('token'));
        const responseApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken.token}`);
        json = await responseApi.json();
      }
      this.setState({
        questions: json.results,
        question: json.results[0],
      }, this.radomQuestions(json.results[0]));
    }

  onHandleNextClick = () => {
    const { questionAtual, questions, idTimer } = this.state;
    clearInterval(idTimer);
    this.setState({
      backClassNormal: true,
      buttonDisabled: false,
    });

    const numberLength = 4;
    if (questionAtual < numberLength) {
      this.setState((prevState) => ({
        question: prevState.questions[prevState.questionAtual + 1],
        questionAtual: prevState.questionAtual + 1,
        timer: 30,
        timePercent: 100,
        isvisiblenextbtn: 'none',
      }), () => this.radomQuestions(questions[questionAtual + 1]));
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  onHandleClickOption = ({ target }, correct) => {
    const { question, backClassNormal, timer } = this.state;
    const { setScore, setAssertion } = this.props;

    this.setState(() => ({
      backClassNormal: !backClassNormal,
      isvisiblenextbtn: 'flex',
      buttonDisabled: true,
    }));
    const levelThree = 3;
    let levelScore;
    if (question.difficulty === 'hard') levelScore = levelThree;
    else if (question.difficulty === 'medium') levelScore = 2;
    else levelScore = 1;

    if (correct) {
      target.classList.add('correctAnswer');
      const proporcaoScore = 10;

      this.setState((prevState) => ({
        score: prevState.score + proporcaoScore + (timer * levelScore),
        assertions: prevState.assertions + 1,
      }), () => {
        const { score, assertions } = this.state;
        const { name } = this.props;
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const playerData = players.find((player) => player.name === name);
        localStorage.setItem('players', JSON.stringify([
          ...players.filter((player) => player.name !== name),
          {
            name: playerData.name,
            score,
            picture: playerData.picture,
            assertions,
          },
        ]));
        setScore(score, playerData.score);
        setAssertion(assertions);
      });
    } else {
      target.classList.add('wrongAnswer');
    }
  }

  timerQuestion = () => {
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
        timePercent: prevState.timePercent - prevState.percentageForSecond,
      }));
      const { timer } = this.state;
      if (timer === 0) clearInterval(interval);
    }, ONE_SECOND);
    this.setState({ idTimer: interval });
  }

  radomQuestions = (question) => {
    const listOptions = question.category
      ? [...question.incorrect_answers] : [];

    listOptions
      .splice(Math
        .floor(Math.random() * listOptions.length), 0, question.correct_answer);
    this.setState(() => ({ listOptions }));
    this.timerQuestion();
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions
          history={ history }
          { ...this.state }
          onHandleNextClick={ this.onHandleNextClick }
          onHandleClickOption={ this.onHandleClickOption }
        />
      </div>
    );
  }
}

Play.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchToken: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  setAssertion: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(setTokenAction()),
  setScore: (score, previousScore) => dispatch(setScoreAction(score, previousScore)),
  setAssertion: (assertions) => dispatch(setAssertionAction(assertions)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
