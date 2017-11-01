import IntroView from './intro-view';
import App from '../../application';
import showScreen from '../../utils/show-screen';
import {fadeOut} from '../../utils/fade';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    showScreen(this.view.element);
    this.view.next = () => {
      fadeOut(this.view.element, 500);
      App.showGreetingFade();
    };
  }
}

export default IntroScreen;
