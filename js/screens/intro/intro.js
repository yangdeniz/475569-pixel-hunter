import IntroView from './intro-view';
import Application from '../../application';
import showScreen from '../../utils/show-screen';
import {fadeOut} from '../../utils/fade';

export default class IntroScreen {
  constructor(data) {
    this.view = new IntroView(data);
  }

  init() {
    showScreen(this.view.element);
    this.view.next = () => {
      fadeOut(this.view.element, 2000);
      Application.showGreetingFade();
    };
    this.view.loadImages();
  }
}
