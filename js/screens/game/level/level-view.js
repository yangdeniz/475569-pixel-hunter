import AbstractView from '../../../abstract-view';
import resize from '../../../utils/resize';

export default class LevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
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

    return `<div class="game">
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

    const images = this.element.querySelectorAll(`.game__option img`);
    for (const image of images) {
      image.onload = () => {
        const containerSize = {
          width: image.width,
          height: image.height
        };
        const imageSize = {
          width: image.naturalWidth,
          height: image.naturalHeight
        };
        const newSize = resize(containerSize, imageSize);
        image.width = newSize.width;
        image.height = newSize.height;
      };
    }

    const getSelectedAnswer = (answers) => {
      for (const answer of answers) {
        if (answer.checked) {
          return answer.value;
        }
      }
      return false;
    };

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

      this.answer = answer;

      this.next();
    };
  }

  next() {}
}
