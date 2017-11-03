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

  next() {}

  bind() {
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

    const isManyOptionsQuestion = !!this.element.querySelector(`input[type="radio"]`);
    let gameOptions = [];
    if (isManyOptionsQuestion) {
      let answerNumber = 1;
      while (this.element.querySelector(`input[name="question${answerNumber}"]`)) {
        gameOptions.push([...(this.element.querySelectorAll(`input[name="question${answerNumber}"]`))]);
        answerNumber++;
      }
    } else {
      gameOptions = [...(this.element.querySelectorAll(`.game__option`))];
    }

    const getSelectedAnswer = (options) => {
      for (const option of options) {
        if (option.checked) {
          return option.value;
        }
      }
      return false;
    };

    const onDivClick = (event) => {
      const answer = gameOptions.indexOf(event.target);
      this.answer = answer;
      this.next();
    };

    const onInputClick = () => {
      const answers = [];
      for (const option of gameOptions) {
        if (!getSelectedAnswer(option)) {
          return;
        }
        answers.push(getSelectedAnswer(option));
      }
      this.answer = answers;
      this.next();
    };

    for (const option of gameOptions) {
      if (!isManyOptionsQuestion) {
        option.onclick = onDivClick;
      } else {
        for (const item of option) {
          item.onclick = onInputClick;
        }
      }
    }
  }
}
