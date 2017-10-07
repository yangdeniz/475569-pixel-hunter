const QUICK_ANSWER_TIME_REMAINED = 20;
const SLOW_ANSWER_TIME_REMAINED = 10;

const getGameResult = (userAnswers, livesRemained) => {
  if (livesRemained < 0) {
    return -1;
  }
  let total = 0;
  for (const answer of userAnswers) {
    if (!answer.isCorrectAnswer) {
      continue;
    }
    total += checkTimeRemained(answer.timeRemained);
  }
  total += (livesRemained * 50);
  return total;
};

const checkTimeRemained = (timeRemained) => {
  if (timeRemained > QUICK_ANSWER_TIME_REMAINED) {
    return 150;
  } else if (timeRemained < SLOW_ANSWER_TIME_REMAINED) {
    return 50;
  } else {
    return 100;
  }
};

export default getGameResult;
