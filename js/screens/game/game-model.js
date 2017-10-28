import tick from '../../utils/tick';
import getNextGameState from '../../utils/get-next-game-state';

export default class GameModel {

  constructor(state) {
    this.state = state;
  }

  update(newState) {
    this.state = newState;
  }

  getNextState(answer) {
    this.update(getNextGameState(this.state, answer));
  }

  tick() {
    this.update(tick(this.state));
  }

}
