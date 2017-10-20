export default (element) => {
  const mainElement = document.querySelector(`main`);
  mainElement.replaceChild(element, mainElement.querySelector(`div`));
};
