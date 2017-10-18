import getGameTemplateByQuestion from '../templates/get-game-template-by-question';
import getElementFromTemplate from '../utils/get-element-from-template';
import getCurrentGameState from '../utils/get-current-game-state';
import showScreen from '../utils/show-screen';
import answerIsCorrect from '../utils/check-user-answer';
import questions from '../data/questions';
import stats from './stats';
import greeting from './greeting';

const getSelectedAnswer = (answers) => {
  for (const answer of answers) {
    if (answer.checked) {
      return answer.value;
    }
  }
  return false;
};

const createGameScreen = (question, state, userAnswers) => {

  const currentQuestionNumber = questions.indexOf(question);

  const game = getElementFromTemplate(getGameTemplateByQuestion(question, state));

  const gameOptions = new Set();
  let optionNumber = 1;
  while (game.querySelector(`input[name="question${optionNumber}"]`)) {
    gameOptions.add(game.querySelectorAll(`input[name="question${optionNumber}"]`));
    optionNumber++;
  }

  const isManyOptionsQuestion = !!game.querySelector(`input[type="radio"]`);

  game.querySelector(`.game__content`).onclick = (e) => {
    const target = e.target;
    let answer;
    if (isManyOptionsQuestion) {
      if (target.type !== `radio`) {
        return;
      }
      answer = [];
      for (const option of gameOptions) {
        if (!getSelectedAnswer(option)) {
          return;
        }
        answer.push(getSelectedAnswer(option));
      }
    } else {
      if (!target.classList.contains(`game__option`)) {
        return;
      }
      const options = game.querySelectorAll(`.game__option`);
      answer = [...options].indexOf(target);
    }

    const currentUserAnswer = {
      isCorrectAnswer: answerIsCorrect(answer, question),
      timeRemained: 15
    };

    const currentUserAnswers = [...userAnswers, currentUserAnswer];

    const currentGameState = getCurrentGameState(state, currentUserAnswer);

    if (currentQuestionNumber < questions.length - 1) {
      const nextQuestion = questions[currentQuestionNumber + 1];
      showScreen(createGameScreen(nextQuestion, currentGameState, currentUserAnswers));
    } else {
      showScreen(stats);
    }
  };

  game.querySelector(`.back`).onclick = () => {
    showScreen(greeting);
  };

  return game;
};

export default createGameScreen;
