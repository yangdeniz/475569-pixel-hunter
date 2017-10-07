const getElementFromTemplate = (template) => {
  const element = document.createElement(`main`);
  element.classList.add(`central`);
  element.innerHTML = template;
  return element;
};

export default getElementFromTemplate;
