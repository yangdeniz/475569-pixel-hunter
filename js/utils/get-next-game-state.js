import {questions, points, time} from '../data/data';
import getGameResult from './get-game-result';

const getAnswerStats = (answer) => {
  if (!answer.isCorrectAnswer) {
    return `wrong`;
  }
  if (answer.timeRemained > time.quickAnswerTimeRemained) {
    return `fast`;
  }
  if (answer.timeRemained < time.slowAnswerTimeRemained) {
    return `slow`;
  }
  return `correct`;
};

const getLivesRemained = (prevStateLives, answer) => {
  if (!answer.isCorrectAnswer) {
    return prevStateLives - 1;
  }
  return prevStateLives;
};

const getNextGameState = (prevState, answer) => {
  const lives = getLivesRemained(prevState.livesRemained, answer);
  const answers = [...(prevState.userAnswers), answer];
  const stats = [...prevState.answersStats];
  stats[prevState.gameNumber] = getAnswerStats(answer);

  const nextGameState = Object.freeze({
    gameNumber: prevState.gameNumber + 1,
    question: questions[prevState.gameNumber + 1] || false,
    time: time.timeTotal,
    livesRemained: lives,
    userAnswers: answers,
    answersStats: stats,
    gameResult: getGameResult(answers, lives, points)
  });

  return nextGameState;
};

export default getNextGameState;
