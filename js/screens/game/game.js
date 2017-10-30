import GameView from './game-view';
import GameModel from './game-model';
import App from '../../application';
import {initialState} from '../../data/data';
import showScreen from '../../utils/show-screen';

class GameScreen {
  constructor(state = initialState) {
    this.model = new GameModel(state);
    this.view = new GameView(this.model);
    this.answers = [];

    this.view.pause = () => {
      this.stopTimer();
    };

    this.view.continueGame = () => {
      this.tick();
    };

    this.view.stopGame = () => {
      App.showGreeting();
    };

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
    if (this.model.state.livesRemained < 0 || !this.model.state.question) {
      this.gameOver();
      return;
    }
    App.startGame(this.model.state);
  }

  timeOver() {
    this.stopTimer();
    this.saveAnswer();
    this.createNextGame();
  }

  gameOver() {
    App.showStats(this.model.state);
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
    isCorrectAnswer: false,
    timeRemained: 0
  }) {
    this.answers.push(answer);
  }
}

export default GameScreen;
