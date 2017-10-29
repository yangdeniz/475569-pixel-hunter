const mainElement = document.querySelector(`main`);
const footer = mainElement.querySelector(`footer`);

const addElement = (element) => {
  mainElement.insertBefore(element, footer);
  element.style.position = `absolute`;
};

const removeElement = (element) => {
  mainElement.removeChild(element);
  for (const child of mainElement.children) {
    if (child.style.position === `absolute`) {
      child.style.position = `relative`;
    }
  }
};

const fadeIn = (element, time) => {
  let opacity = 0;
  element.style.opacity = opacity;
  addElement(element);
  const timer = setInterval(() => {
    if (opacity > 1) {
      clearInterval(timer);
    }
    opacity += 1 / time;
    element.style.opacity = opacity;
  }, time / 1000);
};

const fadeOut = (element, time) => {
  let opacity = 1;
  element.style.opacity = opacity;
  const timer = setInterval(() => {
    if (opacity < 0) {
      clearInterval(timer);
      removeElement(element);
    }
    opacity -= 1 / time;
    element.style.opacity = opacity;
  }, time / 1000);
};

export {fadeIn, fadeOut};
