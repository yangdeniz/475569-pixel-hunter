export default (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element;
};
