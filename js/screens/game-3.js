import getElementFromTemplate from '../utils/get-element-from-template';
import showScreen from '../utils/show-screen';
import getHeaderTemplate from '../utils/get-header-template';
import initialState from '../data/initial-state';
import stats from './stats';
import greeting from './greeting';

const game3Template = `${getHeaderTemplate(initialState)}
<div class="game">
<p class="game__task">Найдите рисунок среди изображений</p>
<form class="game__content  game__content--triple">
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option  game__option--selected">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
</form>
<div class="stats">
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
</div>
</div>`;

const game3 = getElementFromTemplate(game3Template);

game3.querySelector(`.game__content`).onclick = (e) => {
  const target = e.target;
  if (!target.classList.contains(`game__option`)) {
    return;
  }
  showScreen(stats);
};

game3.querySelector(`.back`).onclick = () => {
  showScreen(greeting);
};

export default game3;
