import propTypes from 'prop-types';
import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';
import Timer from '../Timer';
import './style.css';

class Questions extends Component {
  render() {
    const {
      question,
      listOptions,
      backClassNormal,
      isvisiblenextbtn,
      assertions,
      onHandleClickOption,
      onHandleNextClick,
      timer,
      timePercent,
      buttonDisabled,

    } = this.props;

    return (
      <section className="questionsContainer">
        <div className="questionCard">
          <h1>{`Acertos: ${assertions}`}</h1>

          { question.category && (
            <div>
              <h3 data-testid="question-category">{ question.category }</h3>
              <p
                data-testid="question-text"
                dangerouslySetInnerHTML={ { __html: sanitizeHtml(question.question) } }
              />

              <Timer timer={ timer } timePercent={ timePercent } />
              <div data-testid="answer-options" className="options">
                { listOptions.map((questionParagraph, i) => (
                  questionParagraph === question.correct_answer
                    ? (
                      <button
                        key={ i }
                        className={ backClassNormal ? '' : 'correctAnswer' }
                        data-testid="correct-answer"
                        type="button"
                        disabled={ timer === 0 || buttonDisabled }
                        onClick={ (e) => onHandleClickOption(
                          e, true,
                        ) }
                      >
                        {question.correct_answer}
                      </button>)
                    : (
                      <button
                        key={ i }
                        data-testid={ `wrong-answer-${i}` }
                        className={ backClassNormal ? '' : 'wrongAnswer' }
                        type="button"
                        disabled={ timer === 0 || buttonDisabled }
                        onClick={ (e) => onHandleClickOption(
                          e, false,
                        ) }
                      >
                        { questionParagraph }
                      </button>
                    )
                ))}

              </div>
              <div className="btnNext">
                <button
                  type="button"
                  style={ { display: timer === 0 ? 'flex' : isvisiblenextbtn } }
                  data-testid="btn-next"
                  onClick={ onHandleNextClick }
                >
                  Próxima
                </button>
              </div>
            </div>
          ) }
        </div>
      </section>
    );
  }
}

Questions.propTypes = {
  question: propTypes.objectOf(propTypes.string).isRequired,
  listOptions: propTypes.arrayOf(propTypes.string).isRequired,
  timer: propTypes.number.isRequired,
  backClassNormal: propTypes.bool.isRequired,
  isvisiblenextbtn: propTypes.bool.isRequired,
  assertions: propTypes.number.isRequired,
  onHandleNextClick: propTypes.func.isRequired,
  onHandleClickOption: propTypes.func.isRequired,
  timePercent: propTypes.number.isRequired,
  buttonDisabled: propTypes.bool.isRequired,

};

export default Questions;
