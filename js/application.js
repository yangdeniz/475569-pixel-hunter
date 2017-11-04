import Loader from './loader';
import IntroScreen from './screens/intro/intro';
import GreetingScreen from './screens/greeting/greeting';
import GreetingFadeScreen from './screens/greeting/greeting-fade';
import RulesScreen from './screens/rules/rules';
import GameScreen from './screens/game/game';
import StatsScreen from './screens/stats/stats';
import {initialState} from './data/data';
import adapt from './data/data-adapter';

const ControllerId = {
  INTRO: ``,
  GREETING: `greet`,
  GREETING_FADE: `_greet`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

export default class Application {

  static init(data) {
    Application.routes = {
      [ControllerId.INTRO]: new IntroScreen(data),
      [ControllerId.GREETING]: new GreetingScreen(),
      [ControllerId.GREETING_FADE]: new GreetingFadeScreen(),
      [ControllerId.RULES]: new RulesScreen(),
      [ControllerId.GAME]: new GameScreen(data),
      [ControllerId.STATS]: new StatsScreen()
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      this.changeHash(hashValue);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();

    Application.routes[ControllerId.INTRO].init(data);
  }

  static changeHash(id) {
    const controller = Application.routes[id];
    if (controller) {
      controller.init();
    }
  }

  static showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  static showGreetingFade() {
    location.hash = ControllerId.GREETING_FADE;
  }

  static showRules() {
    location.hash = ControllerId.RULES;
  }

  static startGame(state = initialState) {
    Application.routes[ControllerId.GAME].init(state);
  }

  static showStats(state) {
    Loader.saveResults(state).then(() => {
      Application.routes[ControllerId.STATS].init(state);
    });
  }

}

Loader.loadData().
    then(adapt).
    then((questData) => Application.init(questData)).
    catch(window.console.error);
