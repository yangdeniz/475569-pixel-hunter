import GreetingView from './greeting-view';
import App from '../../application';
import showScreen from '../../utils/show-screen';

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    showScreen(this.view.element);
    this.view.next = () => {
      App.showRules();
    };
  }
}

export default GreetingScreen;
