import AbstractView from '../../../abstract-view';
import getElementFromTemplate from '../../../utils/get-element-from-template';

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">${this.state.time}</h1>
    <div class="game__lives">
      ${new Array(3 - this.state.livesRemained)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(this.state.livesRemained)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    </div>
    </header>`;
  }

  updateTimer() {
    const timerTemplate = `<h1 class="game__timer">${this.state.time}</h1>`;
    const newTimerElement = getElementFromTemplate(timerTemplate).firstChild;
    const oldTimerElement = this.element.querySelector(`.game__timer`);
    const header = this.element.querySelector(`.header`);
    if (this.state.time <= 5) {
      header.removeChild(oldTimerElement);
      setTimeout(() => {
        header.insertBefore(newTimerElement, this.element.querySelector(`.game__lives`));
      }, 500);
    } else {
      header.replaceChild(newTimerElement, oldTimerElement);
    }
  }

  showWarningScreen() {}

  bind() {
    const back = this.element.querySelector(`.back`);
    back.onclick = () => this.showWarningScreen();
  }
}
