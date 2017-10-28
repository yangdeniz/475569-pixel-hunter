import IntroScreen from './screens/intro/intro';
import GreetingScreen from './screens/greeting/greeting';
import RulesScreen from './screens/rules/rules';
import GameScreen from './screens/game/game';
import StatsScreen from './screens/stats/stats';

export default class App {

  static showIntro() {
    const intro = new IntroScreen();
    intro.init();
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.init();
  }

  static startGame() {
    const game = new GameScreen();
    game.init();
  }

  static showStats(state) {
    const stats = new StatsScreen(state);
    stats.init();
  }

}
