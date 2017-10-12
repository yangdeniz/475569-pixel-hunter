import getElementFromTemplate from '../utils/get-element-from-template';
import showScreen from '../utils/show-screen';
import answerIsSelected from '../utils/check-answers';
import getHeaderTemplate from '../utils/get-header-template';
import initialState from '../data/initial-state';
import game2 from './game-2';
import greeting from './greeting';

const game1Template = `${getHeaderTemplate(initialState)}
<div class="game">
<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
<form class="game__content">
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input name="question2" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
</form>
<div class="stats">
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
</div>
</div>`;

const game1 = getElementFromTemplate(game1Template);

const answersToQuestion1 = game1.querySelectorAll(`input[name=question1]`);
const answersToQuestion2 = game1.querySelectorAll(`input[name=question2]`);

game1.querySelector(`.game__content`).onclick = (e) => {
  const target = e.target;
  if (target.type !== `radio`) {
    return;
  }
  if (answerIsSelected(answersToQuestion1) && answerIsSelected(answersToQuestion2)) {
    showScreen(game2);
  }
};

game1.querySelector(`.back`).onclick = () => {
  showScreen(greeting);
};

export default game1;
