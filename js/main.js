const screens = document.querySelectorAll(`template`);

let activeScreen = 0;

showScreen(activeScreen);

const leftArrow = 37;
const rightArrow = 39;

document.onkeydown = function (e) {
  if (!e.altKey) {
    return;
  }
  if (e.keyCode === leftArrow && activeScreen > 0) {
    activeScreen--;
  } else if (e.keyCode === rightArrow && activeScreen < screens.length - 1) {
    activeScreen++;
  }
  showScreen(activeScreen);
};

function showScreen(number) {
  if (number < 0 || number > screens.length - 1) {
    return;
  }
  document.querySelector(`main`).innerHTML = screens[number].innerHTML;
}
