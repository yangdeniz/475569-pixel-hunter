const QUICK_ANSWER_TIME_REMAINED = 20;
const SLOW_ANSWER_TIME_REMAINED = 10;

const getAnswerStats = (answer) => {
  if (!answer.isCorrectAnswer) {
    return `wrong`;
  } else if (answer.timeRemained > QUICK_ANSWER_TIME_REMAINED) {
    return `fast`;
  } else if (answer.timeRemained < SLOW_ANSWER_TIME_REMAINED) {
    return `slow`;
  } else {
    return `correct`;
  }
};

const getLivesRemained = (prevStateLives, prevAnswer) => {
  if (!prevAnswer.isCorrectAnswer) {
    return --prevStateLives;
  }
  return prevStateLives;
};

const getCurrentGameState = (prevState, prevAnswer) => {
  const allAnswers = [...prevState.answersStats];
  allAnswers[prevState.gameNumber] = getAnswerStats(prevAnswer);
  const currentGameState = Object.freeze({
    gameNumber: prevState.gameNumber + 1,
    timer: 30,
    livesRemained: getLivesRemained(prevState.livesRemained, prevAnswer),
    answersStats: allAnswers
  });
  return currentGameState;
};

export default getCurrentGameState;
