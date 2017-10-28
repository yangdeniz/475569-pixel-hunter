import IntroView from './intro-view';
import App from '../../application';
import showScreen from '../../utils/show-screen';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    showScreen(this.view.element);
    this.view.next = () => {
      App.showGreeting();
    };
  }
}

export default IntroScreen;
