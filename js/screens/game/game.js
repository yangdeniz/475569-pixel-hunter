import GameView from './game-view';
import getStats from '../stats/stats';
import greeting from '../greeting/greeting';
import showScreen from '../../utils/show-screen';
import getNextGameState from '../../utils/get-next-game-state';
import getGameResult from '../../utils/get-game-result';
import gamePoints from '../../data/game-points';

const getNextGame = (state) => {

  const game = new GameView(state);

  game.next = () => {
    const nextState = getNextGameState(game.state, game.userAnswer);
    if (!nextState.question || nextState.livesRemained < 0) {
      const gameResult = getGameResult(nextState, gamePoints);
      showScreen(getStats(nextState, gameResult).element);
    } else {
      showScreen(getNextGame(nextState).element);
    }
  };

  game.returnBack = () => {
    showScreen(greeting());
  };

  return game;

};

export default getNextGame;
