const showScreen = (element) => {
  const mainElement = document.querySelector(`main`);
  mainElement.parentNode.replaceChild(element, mainElement);
};

export default showScreen;
