const showScreen = (element) => {
  document.querySelector(`main`).innerHTML = element.innerHTML;
};

export default showScreen;
