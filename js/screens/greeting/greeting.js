import GreetingView from './greeting-view';
import App from '../../application';
import showScreen from '../../utils/show-screen';

export default class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    this.show();
    this.view.next = () => App.showRules();
  }

  show() {
    showScreen(this.view.element);
  }
}
