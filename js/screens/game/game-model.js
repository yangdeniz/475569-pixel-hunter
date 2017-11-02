import tick from '../../utils/tick';
import getNextGameState from '../../utils/get-next-game-state';

export default class GameModel {

  constructor(data, state) {
    this.data = data;
    this.state = state;
  }

  update(newState) {
    this.state = newState;
  }

  getNextState(answer) {
    const nextState = getNextGameState(this.state, answer);
    this.update(nextState);
    if (nextState.livesRemained < 0 || nextState.gameNumber >= this.data.length) {
      this.gameOver();
      return;
    }
    this.nextGame();
  }

  tick() {
    this.update(tick(this.state));
  }

  nextGame() {}

  gameOver() {}

}
