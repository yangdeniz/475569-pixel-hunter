import getHeaderTemplate from './get-header-template';
import getFooterStatsTemplate from './get-footer-stats-template';

const getAnswersTemplate = (option) => {
  if (!option.answer) {
    return false;
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
  } else if (content.size === 3) {
    return ` game__content--triple`;
  } else {
    return ``;
  }
};

const getGameTemplateByQuestion = (question, gameState) => {
  return `${getHeaderTemplate(gameState)}
    <div class="game">
    <p class="game__task">${question.task}</p>
    <form class="game__content${addClassToQuestionForm(question.content)}">
    ${[...question.content].map((option) => {
    return `<div class="game__option">
        <img src="${option.image.src}" alt="Option ${option.number}" width="${option.image.width}" height="${option.image.height}">
        ${getAnswersTemplate(option)}
      </div>`;
  }).join(``)}
  </form>
  ${getFooterStatsTemplate(gameState)}
  </div>`;
};

export default getGameTemplateByQuestion;
