import getElementFromTemplate from '../utils/get-element-from-template';
import showScreen from '../utils/show-screen';
import answerIsSelected from '../utils/check-answers';
import getHeaderTemplate from '../utils/get-header-template';
import getFooterStatsTemplate from '../utils/get-footer-stats-template';
import initialState from '../data/initial-state';
import game3 from './game-3';
import greeting from './greeting';

const game2Template = `${getHeaderTemplate(initialState)}
<div class="game">
<p class="game__task">Угадай, фото или рисунок?</p>
<form class="game__content  game__content--wide">
  <div class="game__option">
    <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
</form>
${getFooterStatsTemplate(initialState)}
</div>`;

const game2 = getElementFromTemplate(game2Template);

const answersToQuestion = game2.querySelectorAll(`input[name=question1]`);

game2.querySelector(`.game__content`).onclick = (e) => {
  const target = e.target;
  if (target.type !== `radio`) {
    return;
  }
  if (answerIsSelected(answersToQuestion)) {
    showScreen(game3);
  }
};

game2.querySelector(`.back`).onclick = () => {
  showScreen(greeting);
};

export default game2;
