import RulesView from './rules-view';
import getNextGame from '../game/game';
import greeting from '../greeting/greeting';
import showScreen from '../../utils/show-screen';
import initialState from '../../data/initial-state';

const rules = new RulesView();

rules.next = () => {
  showScreen(getNextGame(initialState).element);
};

rules.returnBack = () => {
  showScreen(greeting().element);
};

export default () => rules;
