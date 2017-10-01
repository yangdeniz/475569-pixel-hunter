const screens = document.querySelectorAll(`template`);

let activeScreen = 0;

showScreen(activeScreen);

let pressedKeys = [];

document.onkeydown = function (e) {
  pressedKeys.push(e.keyCode);
  if (pressedKeys.indexOf(18) < 0 && (pressedKeys.indexOf(39) < 0 || pressedKeys.indexOf(37) < 0)) {
    return;
  }
  if (pressedKeys.indexOf(39) >= 0 && activeScreen < screens.length - 1) {
    activeScreen++;
  } else if (pressedKeys.indexOf(37) >= 0 && activeScreen > 0) {
    activeScreen--;
  }
  showScreen(activeScreen);
};

document.onkeyup = function (e) {
  const key = pressedKeys.indexOf(e.keyCode);
  pressedKeys.splice(key, 1);
};

function showScreen(number) {
  if (number < 0 || number > screens.length - 1) {
    return;
  }
  document.querySelector(`main`).innerHTML = screens[number].innerHTML;
}
