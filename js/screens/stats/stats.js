import StatsView from './stats-view';
import greeting from '../greeting/greeting';
import showScreen from '../../utils/show-screen';

const getStats = (state, result) => {
  const stats = new StatsView(state, result);
  stats.returnBack = () => {
    showScreen(greeting().element);
  };
  return stats;
};

export default getStats;
