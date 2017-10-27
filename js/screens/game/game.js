import GameView from './game-view';
import WarningScreenView from './warning-screen-view';
import getStats from '../stats/stats';
import greeting from '../greeting/greeting';
import showScreen from '../../utils/show-screen';
import getNextGameState from '../../utils/get-next-game-state';
import getGameResult from '../../utils/get-game-result';
import gamePoints from '../../data/game-points';

const getNextGame = (state) => {

  const game = new GameView(state);

  const warningScreen = new WarningScreenView();

  game.next = () => {
    clearInterval(timer);
    const nextState = getNextGameState(game.state, game.userAnswer);
    if (!nextState.question || nextState.livesRemained < 0) {
      const gameResult = getGameResult(nextState, gamePoints);
      showScreen(getStats(nextState, gameResult).element);
    } else {
      showScreen(getNextGame(nextState).element);
    }
  };

  game.showWarningScreen = () => {
    clearInterval(timer);
    game.element.appendChild(warningScreen.element);
  };

  warningScreen.returnBack = () => {
    showScreen(greeting().element);
  };

  warningScreen.continueGame = () => {
    game.element.removeChild(warningScreen.element);
    timer = setInterval(() => {
      if (!game.timer.time) {
        game.userAnswer = {
          isCorrectAnswer: false,
          timeRemained: 0
        };
        game.next();
      }
      game.updateTime();
    }, 1000);
  };

  let timer = setInterval(() => {
    if (!game.timer.time) {
      game.userAnswer = {
        isCorrectAnswer: false,
        timeRemained: 0
      };
      game.next();
    }
    game.updateTime();
  }, 1000);

  return game;

};

export default getNextGame;
