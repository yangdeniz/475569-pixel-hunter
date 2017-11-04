import GameView from './game-view';
import GameModel from './game-model';
import Application from '../../application';
import {initialState} from '../../data/data';
import showScreen from '../../utils/show-screen';

export default class GameScreen {
  constructor(data, state = initialState) {
    this.model = new GameModel(data, state);
    this.view = new GameView(this.model);
    this.answers = [];

    this.model.nextGame = () => Application.startGame(this.model.state);
    this.model.gameOver = () => Application.showStats(this.model.state);

    this.view.pause = () => this.stopTimer();
    this.view.continueGame = () => this.tick();
    this.view.stopGame = Application.showGreeting;

    this.view.nextGame = () => {
      this.stopTimer();
      this.saveAnswer(this.view.getAnswer());
      this.createNextGame();
    };
  }

  init(state = initialState) {
    this.model.update(state);
    showScreen(this.view.element);
    this.view.updateView();
    this.tick();
  }

  createNextGame() {
    this.model.getNextState(this.answers[this.answers.length - 1]);
  }

  timeOver() {
    this.stopTimer();
    this.saveAnswer();
    this.createNextGame();
  }

  tick() {
    this.timer = setInterval(() => {
      if (this.model.state.time === 0) {
        this.timeOver();
        return;
      }
      this.model.tick();
      this.view.updateTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  saveAnswer(answer = {
    isCorrect: false,
    timeRemained: 0
  }) {
    this.answers.push(answer);
  }
}
