import getGameTemplate from '../utils/get-game-template';
import getElementFromTemplate from '../utils/get-element-from-template';
import answerIsSelected from '../utils/check-answers';
import showScreen from '../utils/show-screen';
import questions from '../data/questions';
import stats from './stats';
import greeting from './greeting';

const createNextGame = (gameNumber) => {
  const game = getElementFromTemplate(getGameTemplate(gameNumber));

  const gameOptions = new Set();
  let questionNumber = 1;
  while (game.querySelector(`input[name="question${questionNumber}"]`)) {
    gameOptions.add(game.querySelectorAll(`input[name="question${questionNumber}"]`));
    questionNumber++;
  }

  game.querySelector(`.game__content`).onclick = (e) => {
    const target = e.target;
    if (game.querySelector(`input[type="radio"]`)) {
      if (target.type !== `radio`) {
        return;
      }
      for (const option of [...gameOptions]) {
        if (!answerIsSelected(option)) {
          return;
        }
      }
    } else if (!target.classList.contains(`game__option`)) {
        return;
    }
    if (gameNumber < questions.length - 1) {
      showScreen(createNextGame(++gameNumber));
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
