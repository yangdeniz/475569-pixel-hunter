const mainElement = document.querySelector(`main`);
const footer = mainElement.querySelector(`footer`);

const addElement = (element) => {
  mainElement.insertBefore(element, footer);
  element.style.position = `absolute`;
  element.style.top = 0;
};

const removeElement = (element) => {
  if ([...mainElement.childNodes].indexOf(element) >= 0) {
    mainElement.removeChild(element);
  }
  for (const child of mainElement.children) {
    if (child.style.position === `absolute`) {
      child.style.position = `relative`;
    }
  }
};

const fadeIn = (element, time) => {
  element.style.opacity = 0;
  addElement(element);

  let start = null;
  const animationHandler = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const progress = timestamp - start;
    element.style.opacity = progress / time;
    if (progress >= time) {
      return;
    }
    window.requestAnimationFrame(animationHandler);
  };

  window.requestAnimationFrame(animationHandler);
};

const fadeOut = (element, time) => {
  let start = null;
  const animationHandler = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const progress = timestamp - start;
    element.style.opacity = 1.0 - progress / time;
    if (progress >= time) {
      removeElement(element);
      return;
    }
    window.requestAnimationFrame(animationHandler);
  };

  window.requestAnimationFrame(animationHandler);
};

export {fadeIn, fadeOut};
