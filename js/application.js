import IntroScreen from './screens/intro/intro';
import GreetingScreen from './screens/greeting/greeting';
import GreetingFadeScreen from './screens/greeting/greeting-fade';
import RulesScreen from './screens/rules/rules';
import GameScreen from './screens/game/game';
import StatsScreen from './screens/stats/stats';
import {initialState} from './data/data';
import {encode, decode} from './utils/encode-state';

const ControllerId = {
  INTRO: ``,
  GREETING: `greet`,
  GREETING_FADE: `greet1`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const saveState = (state) => {
  if (!state) {
    return ``;
  }
  return encode(state);
};

const loadState = (dataString) => {
  if (!dataString) {
    return initialState;
  }
  return decode(dataString);
};

export default class App {

  static init(state) {
    App.routes = {
      [ControllerId.INTRO]: new IntroScreen(),
      [ControllerId.GREETING]: new GreetingScreen(),
      [ControllerId.GREETING_FADE]: new GreetingFadeScreen(),
      [ControllerId.RULES]: new RulesScreen(),
      [ControllerId.GAME]: new GameScreen(state),
      [ControllerId.STATS]: new StatsScreen(state)
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = App.routes[id];
    if (controller) {
      controller.init(loadState(data));
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
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static showStats(state) {
    location.hash = `${ControllerId.STATS}?${saveState(state)}`;
  }

}

App.init();
