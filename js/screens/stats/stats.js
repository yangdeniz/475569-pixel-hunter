import StatsView from './stats-view';
import App from '../../application';
import showScreen from '../../utils/show-screen';

class StatsScreen {
  constructor(state) {
    this.view = new StatsView(state);
  }

  init() {
    showScreen(this.view.element);
    this.view.returnBack = () => {
      App.showGreeting();
    };
  }
}

export default StatsScreen;
