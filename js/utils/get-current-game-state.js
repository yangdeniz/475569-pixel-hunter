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

const getCurrentGameState = (prevState, answer) => {
  const allAnswers = [...prevState.answersStats];
  allAnswers[prevState.gameNumber] = getAnswerStats(answer);
  const currentGameState = Object.freeze({
    gameNumber: prevState.gameNumber + 1,
    timer: 30,
    livesRemained: getLivesRemained(prevState.livesRemained, answer),
    answersStats: allAnswers
  });
  return currentGameState;
};

export default getCurrentGameState;
