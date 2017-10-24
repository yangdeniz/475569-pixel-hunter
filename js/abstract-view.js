import getElementFromTemplate from './utils/get-element-from-template';

export default class AbstractView {

  get template() {}

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

}
