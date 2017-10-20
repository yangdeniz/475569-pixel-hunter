import getStatsTemplate from '../templates/get-stats-template';
import getElementFromTemplate from '../utils/get-element-from-template';
import showScreen from '../utils/show-screen';
import greeting from './greeting';

const createStatsScreen = (state, gameResult) => {

  const stats = getElementFromTemplate(getStatsTemplate(state, gameResult));

  stats.querySelector(`.back`).onclick = () => {
    showScreen(greeting);
  };

  return stats;

};

export default createStatsScreen;
