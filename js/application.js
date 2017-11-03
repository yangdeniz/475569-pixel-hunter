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

export default class App {

  static init(data) {
    App.routes = {
      [ControllerId.INTRO]: new IntroScreen(),
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

    App.routes[ControllerId.INTRO].view.loadImages(data);
  }

  static changeHash(id) {
    const controller = App.routes[id];
    if (controller) {
      controller.init();
    }
  }

  static showIntro() {
    location.hash = ControllerId.INTRO;
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
    App.routes[ControllerId.GAME].init(state);
  }

  static showStats(state) {
    Loader.saveResults(state).then(() => {
      App.routes[ControllerId.STATS].init(state);
    });
  }

}

Loader.loadData().
    then(adapt).
    then((questData) => App.init(questData)).
    catch(window.console.error);
