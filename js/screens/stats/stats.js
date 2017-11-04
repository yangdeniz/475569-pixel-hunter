import StatsView from './stats-view';
import adaptStats from './adapt-stats';
import Application from '../../application';
import Loader from '../../loader';
import showScreen from '../../utils/show-screen';

class StatsScreen {
  init(state) {
    const gameIsWon = (state.gameResult !== -1);
    const view = new StatsView(gameIsWon);
    showScreen(view.element);
    view.returnBack = Application.showGreeting;
    Loader.loadResults().
        then((stats) => adaptStats(stats)).
        then((stats) => view.printStats(stats));
  }
}

export default StatsScreen;
