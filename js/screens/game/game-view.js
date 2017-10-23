import AbstractView from '../../abstract-view';
import answerIsCorrect from '../../utils/check-user-answer';
import getTimer from '../../utils/get-timer';
import getElementFromTemplate from '../../utils/get-element-from-template';

export default class GameView extends AbstractView {

  constructor(state) {
    super();
    this.state = state;
  }

  get timer() {
    if (!this._timer) {
      return getTimer(30);
    }
    return this._timer;
  }

  updateTime() {
    this._timer = this.timer.tick();
    const timerTemplate = `<h1 class="game__timer">${this.timer.time}</h1>`;
    const newTimerElement = getElementFromTemplate(timerTemplate).firstChild;
    const oldTimerElement = this.element.querySelector(`.game__timer`);
    if (this.timer.time <= 5) {
      this.element.querySelector(`.header`).removeChild(oldTimerElement);
      setTimeout(() => {
        this.element.querySelector(`.header`).insertBefore(newTimerElement, this.element.querySelector(`.game__lives`));
      }, 500);
    } else {
      this.element.querySelector(`.header`).replaceChild(newTimerElement, oldTimerElement);
    }
  }

  get template() {

    const getAnswersTemplate = (option) => {
      if (!option.answer) {
        return ``;
      }
      return `<label class="game__answer game__answer--photo">
          <input name="question${option.number}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${option.number}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>`;
    };

    const addClassToQuestionForm = (content) => {
      if (content.size === 1) {
        return ` game__content--wide`;
      }
      if (content.size === 3) {
        return ` game__content--triple`;
      }
      return ``;
    };

    return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">${this.timer.time}</h1>
    <div class="game__lives">
      ${new Array(3 - this.state.livesRemained)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(this.state.livesRemained)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    </div>
    </header>
    <div class="game">
    <p class="game__task">${this.state.question.task}</p>
    <form class="game__content${addClassToQuestionForm(this.state.question.content)}">
    ${[...(this.state.question.content)].map((option) => {
    return `<div class="game__option">
        <img src="${option.image.src}" alt="Option ${option.number}" width="${option.image.width}" height="${option.image.height}">
        ${getAnswersTemplate(option)}
      </div>`;
  }).join(``)}
  </form>
  <div class="stats">
  <ul class="stats">
    ${this.state.answersStats.map((answer) =>
    `<li class="stats__result stats__result--${answer}"></li>`)}
  </ul>
  </div>`;
  }

  bind() {
    const content = this.element.querySelector(`.game__content`);
    const isManyOptionsQuestion = !!this.element.querySelector(`input[type="radio"]`);

    const gameOptions = new Set();
    let optionNumber = 1;
    while (this.element.querySelector(`input[name="question${optionNumber}"]`)) {
      gameOptions.add(this.element.querySelectorAll(`input[name="question${optionNumber}"]`));
      optionNumber++;
    }

    const getSelectedAnswer = (answers) => {
      for (const answer of answers) {
        if (answer.checked) {
          return answer.value;
        }
      }
      return false;
    };

    const back = this.element.querySelector(`.back`);

    content.onclick = (e) => {
      const target = e.target;
      let answer;
      if (isManyOptionsQuestion) {
        if (target.type !== `radio`) {
          return;
        }
        answer = [];
        for (const option of gameOptions) {
          if (!getSelectedAnswer(option)) {
            return;
          }
          answer.push(getSelectedAnswer(option));
        }
      } else {
        if (!target.classList.contains(`game__option`)) {
          return;
        }
        const options = this.element.querySelectorAll(`.game__option`);
        answer = [...options].indexOf(target);
      }

      const question = this.state.question;

      this.userAnswer = {
        isCorrectAnswer: answerIsCorrect(answer, question),
        timeRemained: this.timer.time
      };

      this.next();
    };

    back.onclick = () => {
      this.returnBack();
    };
  }

  set userAnswer(answer) {
    this._userAnswer = answer;
  }

  get userAnswer() {
    return this._userAnswer;
  }

  next() {}

  returnBack() {}

}
