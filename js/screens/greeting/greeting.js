import GreetingView from './greeting-view';
import rules from '../rules/rules';
import showScreen from '../../utils/show-screen';

const greeting = new GreetingView();

greeting.next = () => {
  showScreen(rules().element);
};

export default () => greeting;
