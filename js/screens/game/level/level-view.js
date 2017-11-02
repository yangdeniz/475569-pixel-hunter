import AbstractView from '../../../abstract-view';
import resize from '../../../utils/resize';

export default class LevelView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
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
    <p class="game__task">${this.question.task}</p>
    <form class="game__content${addClassToQuestionForm(this.question.content)}">
    ${[...(this.question.content)].map((option) => {
    return `<div class="game__option">
      <img src="${option.image.url}" alt="Option ${option.number}" width="${option.image.width}" height="${option.image.height}">
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

    const gameOptions = this.element.querySelectorAll(`.game__option`);

    const gameAnswers = new Set();
    let answerNumber = 1;
    while (this.element.querySelector(`input[name="question${answerNumber}"]`)) {
      gameAnswers.add(this.element.querySelectorAll(`input[name="question${answerNumber}"]`));
      answerNumber++;
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
        for (const item of gameAnswers) {
          if (!getSelectedAnswer(item)) {
            return;
          }
          answer.push(getSelectedAnswer(item));
        }
      } else {
        if (!target.classList.contains(`game__option`)) {
          return;
        }
        answer = [...gameOptions].indexOf(target);
      }

      this.answer = answer;

      this.next();
    };
  }

  next() {}
}
