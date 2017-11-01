import AbstractView from '../../abstract-view';
import HeaderView from './header/header-view';
import LevelView from './level/level-view';
import WarningView from './warning/warning-view';
import answerIsCorrect from '../../utils/check-user-answer';
import {fadeIn, fadeOut} from '../../utils/fade';

const update = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

export default class GameView extends AbstractView {

  constructor(model) {
    super();
    this.model = model;
    this.warning = new WarningView();
    this.warning.continueGame = () => {
      fadeOut(this.warning.element, 50);
      this.continueGame();
    };
    this.warning.returnBack = () => {
      document.querySelector(`main`).removeChild(this.warning.element);
      this.stopGame();
    };
  }

  get template() {
    return `<header class="header-container"></header>
    <div class="level-container"></div>`;
  }

  bind() {
    this.headerContainer = this.element.querySelector(`.header-container`);
    this.levelContainer = this.element.querySelector(`.level-container`);
    return super.bind();
  }

  updateHeader() {
    const newHeader = new HeaderView(this.model.state);
    update(this.headerContainer, newHeader);
    this.header = newHeader;
    this.header.showWarningScreen = () => {
      this.pause();
      fadeIn(this.warning.element, 50);
    };
  }

  updateTimer() {
    this.updateHeader();
    this.header.updateTimer();
  }

  updateLevel() {
    const question = this.model.data[this.model.state.gameNumber];
    const newLevel = new LevelView(this.model.state, question);
    update(this.levelContainer, newLevel);
    this.level = newLevel;
    this.level.next = () => {
      this.nextGame();
    };
  }

  updateView() {
    this.updateHeader();
    this.updateLevel();
  }

  getAnswer() {
    const answer = this.level.answer;
    const question = this.model.data[this.model.state.gameNumber];
    const userAnswer = {
      isCorrectAnswer: answerIsCorrect(answer, question),
      timeRemained: this.model.state.time
    };
    return userAnswer;
  }

  pause() {}

  continueGame() {}

  stopGame() {}

  nextGame() {}

}
