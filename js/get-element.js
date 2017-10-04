const getElement = (template) => {
  const element = document.createElement(`template`);
  element.innerHTML = template;
  return element;
};

export default getElement;
