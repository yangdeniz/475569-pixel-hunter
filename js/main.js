import intro from './intro';
import showScreen from './show-screen';
import greeting from './greeting';

document.onload = function () {
  showScreen(intro);
};

document.querySelector(`main`).addEventListener(`click`, function (event) {
  const target = event.target;
  if (!target.parentNode.classList.contains(`back`)) {
    return;
  }
  showScreen(greeting);
});
