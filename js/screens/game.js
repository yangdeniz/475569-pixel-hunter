import getGameTemplate from '../templates/get-game-template';
import getElementFromTemplate from '../utils/get-element-from-template';
import getCurrentGameState from '../utils/get-current-game-state';
import showScreen from '../utils/show-screen';
import answerIsCorrect from '../utils/check-user-answer';
import getUserAnswers from '../utils/get-user-answers';
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

const createNextGame = (gameState, gameUserAnswers) => {
  const game = getElementFromTemplate(getGameTemplate(gameState));

  const gameOptions = new Set();
  let questionNumber = 1;
  while (game.querySelector(`input[name="question${questionNumber}"]`)) {
    gameOptions.add(game.querySelectorAll(`input[name="question${questionNumber}"]`));
    questionNumber++;
  }

  game.querySelector(`.game__content`).onclick = (e) => {
    const target = e.target;
    let answer;
    if (game.querySelector(`input[type="radio"]`)) {
      if (target.type !== `radio`) {
        return;
      }
      answer = [];
      for (const option of gameOptions) {
        if (!getSelectedAnswer(option)) {
          return;
        } else {
          answer.push(getSelectedAnswer(option));
        }
      }
    } else {
      if (!target.classList.contains(`game__option`)) {
        return;
      } else {
        const options = game.querySelectorAll(`.game__option`);
        answer = [...options].indexOf(target);
      }
    }

    const currentUserAnswer = {
      isCorrectAnswer: answerIsCorrect({questionNumber: gameState.gameNumber, content: answer}),
      timeRemained: 15
    };

    const userAnswers = getUserAnswers(gameUserAnswers, currentUserAnswer);

    const currentGameState = getCurrentGameState(gameState, currentUserAnswer);

    if (gameState.gameNumber < questions.length - 1) {
      showScreen(createNextGame(currentGameState, userAnswers));
    } else {
      showScreen(stats);
    }
  };

  game.querySelector(`.back`).onclick = () => {
    showScreen(greeting);
  };

  return game;
};

export default createNextGame;
