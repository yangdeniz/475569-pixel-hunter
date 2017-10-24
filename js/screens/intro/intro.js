import IntroView from './intro-view';
import greeting from '../greeting/greeting';
import showScreen from '../../utils/show-screen';

const intro = new IntroView();

intro.next = () => {
  showScreen(greeting().element);
};

export default () => intro;
