import GreetingScreen from './greeting';
import {fadeIn} from '../../utils/fade';

export default class GreetingFadeScreen extends GreetingScreen {
  show() {
    fadeIn(this.view.element, 500);
  }
}
