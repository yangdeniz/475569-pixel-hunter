import GreetingScreen from './greeting';
import {fadeIn} from '../../utils/fade';

class GreetingFadeScreen extends GreetingScreen {
  show() {
    fadeIn(this.view.element, 1000);
  }
}

export default GreetingFadeScreen;
