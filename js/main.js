import showScreen from './utils/show-screen';
import intro from './screens/intro/intro';

window.onload = () => {
  showScreen(intro().element);
};
