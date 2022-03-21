import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayerAction } from '../../redux/actions/setPlayerAction';
import setTokenAction from '../../redux/actions/setTokenAction';
import './style.css';
import imageTRV from './TRV_Logo.png';

class Login extends Component {
  state = {
    firstName: '',
    email: '',
    isDisabled: true,
  }

  validateForm = () => {
    const { email, firstName } = this.state;
    // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const validateEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 2;
    const isValid = validateEmail.test(email) && firstName.length >= MIN_LENGTH;
    this.setState({
      isDisabled: !isValid,
    });
  }

  setUserLocalStorage = (firstName, email) => {
    const gravatarToken = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${gravatarToken}`;
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const playerData = players.find((player) => player.name === firstName);
    if (playerData) return;

    localStorage.setItem(
      'players',
      JSON.stringify([...players, { name: firstName, score: 0, picture }]),
    );
  };

  onHandleSubmit = async () => {
    const { fetchToken, history, setPlayer } = this.props;
    const { firstName, email } = this.state;
    setPlayer({ firstName, email });
    await fetchToken();

    this.setUserLocalStorage(firstName, email);

    history.push('/play');
  }

  onHandleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  onInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState(() => ({
      [id]: value,
    }), () => this.validateForm());
  }

  render() {
    const { firstName, email, isDisabled } = this.state;
    return (
      <div className="login">
        <img src={ imageTRV } alt="triviaLogo" />
        <div className="container-login">
          <form className="form-login">
            <label htmlFor="email">
              Email do Gravatar:
              <input
                data-testid="input-gravatar-email"
                id="email"
                type="text"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="firstName">
              Nome do Jogador:
              <input
                data-testid="input-player-name"
                id="firstName"
                type="text"
                value={ firstName }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              onClick={ this.onHandleSubmit }
              disabled={ isDisabled }
            >
              Jogar

            </button>

            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.onHandleSettings }
            >
              Settings

            </button>

          </form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(setTokenAction()),
  setPlayer: (firstName, email) => dispatch(setPlayerAction(firstName, email)),
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setPlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
