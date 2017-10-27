import introScreen from './screens/intro/intro';
import greetingScreen from './screens/greeting/greeting';
import rulesScreen from './screens/rules/rules';
import gameScreen from './screens/game/game';
import StatsScreen from './screens/stats/stats';

export default class App {

  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static startGame() {
    gameScreen.init();
  }

  static showStats(state) {
    const stats = new StatsScreen(state);
    stats.init();
  }

}
