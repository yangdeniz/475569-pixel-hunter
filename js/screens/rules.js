import getElementFromTemplate from '../utils/get-element-from-template';
import showScreen from '../utils/show-screen';
import initialState from '../data/initial-state';
import createNextGame from './game';
import greeting from './greeting';

const rulesTemplate = `<header class="header">
<div class="header__back">
  <button class="back">
    <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
    <img src="img/logo_small.svg" width="101" height="44">
  </button>
</div>
</header>
<div class="rules">
<h1 class="rules__title">Правила</h1>
<p class="rules__description">Угадай 10 раз для каждого изображения фото <img
  src="img/photo_icon.png" width="16" height="16"> или рисунок <img
  src="img/paint_icon.png" width="16" height="16" alt="">.<br>
  Фотографиями или рисунками могут быть оба изображения.<br>
  На каждую попытку отводится 30 секунд.<br>
  Ошибиться можно не более 3 раз.<br>
  <br>
  Готовы?
</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>
</div>`;

const rules = getElementFromTemplate(rulesTemplate);

rules.querySelector(`.rules__input`).oninput = () => {
  const value = rules.querySelector(`.rules__input`).value;
  if (value && value.trim().length > 0) {
    rules.querySelector(`.rules__button`).disabled = false;
  }
  if (!value) {
    rules.querySelector(`.rules__button`).disabled = true;
  }
};

rules.querySelector(`.rules__button`).onclick = () => {
  showScreen(createNextGame(initialState, []));
};

rules.querySelector(`.back`).onclick = () => {
  showScreen(greeting);
};

export default rules;
