import GreetingScreen from './greeting';
import {fadeIn} from '../../utils/fade';

class GreetingFadeScreen extends GreetingScreen {
  show() {
    fadeIn(this.view.element, 500);
  }
}

export default GreetingFadeScreen;
