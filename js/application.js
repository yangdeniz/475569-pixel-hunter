import IntroScreen from './screens/intro/intro';
import GreetingScreen from './screens/greeting/greeting';
import RulesScreen from './screens/rules/rules';
import GameScreen from './screens/game/game';
import StatsScreen from './screens/stats/stats';
import {initialState} from './data/data';

const ControllerId = {
  INTRO: ``,
  GREETING: `greet`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return initialState;
  }
};

export default class App {

  static init(state) {
    App.routes = {
      [ControllerId.INTRO]: new IntroScreen(),
      [ControllerId.GREETING]: new GreetingScreen(),
      [ControllerId.RULES]: new RulesScreen(),
      [ControllerId.GAME]: new GameScreen(),
      [ControllerId.STATS]: new StatsScreen(state),
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
