import questions from '../data/questions';

const QUICK_ANSWER_TIME_REMAINED = 20;
const SLOW_ANSWER_TIME_REMAINED = 10;

const getAnswerStats = (answer) => {
  if (!answer.isCorrectAnswer) {
    return `wrong`;
  }
  if (answer.timeRemained > QUICK_ANSWER_TIME_REMAINED) {
    return `fast`;
  }
  if (answer.timeRemained < SLOW_ANSWER_TIME_REMAINED) {
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
  const stats = [...prevState.answersStats];
  stats[prevState.gameNumber] = getAnswerStats(answer);
  const nextGameState = Object.freeze({
    gameNumber: prevState.gameNumber + 1,
    question: questions[prevState.gameNumber + 1] || false,
    livesRemained: getLivesRemained(prevState.livesRemained, answer),
    userAnswers: [...(prevState.userAnswers), answer],
    answersStats: stats
  });
  return nextGameState;
};

export default getNextGameState;
