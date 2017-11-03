import {TimeRemained, AnswerTypes} from './data';
import getGameResult from './get-game-result';

const getAnswersStats = (answer) => {
  if (!answer.isCorrect) {
    return AnswerTypes.WRONG;
  }
  if (answer.timeRemained > TimeRemained.QUICK_ANSWER) {
    return AnswerTypes.FAST;
  }
  if (answer.timeRemained < TimeRemained.SLOW_ANSWER) {
    return AnswerTypes.SLOW;
  }
  return AnswerTypes.CORRECT;
};

const getLivesRemained = (prevStateLives, answer) => {
  if (!answer.isCorrect) {
    return prevStateLives - 1;
  }
  return prevStateLives;
};

export default (prevState, answer) => {
  const lives = getLivesRemained(prevState.livesRemained, answer);
  const answers = [...(prevState.userAnswers), answer];
  const stats = [...prevState.answersStats];
  stats[prevState.gameNumber] = getAnswersStats(answer);

  const nextGameState = Object.freeze({
    gameNumber: prevState.gameNumber + 1,
    time: TimeRemained.TOTAL,
    livesRemained: lives,
    userAnswers: answers,
    answersStats: stats,
    gameResult: getGameResult(answers, lives)
  });

  return nextGameState;
};
