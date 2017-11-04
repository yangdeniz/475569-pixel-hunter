import RulesView from './rules-view';
import Application from '../../application';
import showScreen from '../../utils/show-screen';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    showScreen(this.view.element);
    this.view.next = Application.startGame;
    this.view.returnBack = Application.showGreeting;
  }
}

export default RulesScreen;
