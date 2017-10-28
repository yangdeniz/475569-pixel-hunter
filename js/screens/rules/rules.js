import RulesView from './rules-view';
import App from '../../application';
import showScreen from '../../utils/show-screen';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    showScreen(this.view.element);
    this.view.next = () => {
      App.startGame();
    };
    this.view.returnBack = () => {
      App.showGreeting();
    };
  }
}

export default RulesScreen;
