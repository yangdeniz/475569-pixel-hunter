import showScreen from './utils/show-screen';
import intro from './screens/intro';
import greeting from './screens/greeting';

document.onload = function () {
  showScreen(intro);
};

document.querySelector(`body`).addEventListener(`click`, function (event) {
  const target = event.target;
  if (!target.parentNode.classList.contains(`back`)) {
    return;
  }
  showScreen(greeting);
});
