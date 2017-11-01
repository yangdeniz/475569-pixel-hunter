const Points = Object.freeze({
  CORRECT_ANSWER_POINTS: 100,
  QUICK_ANSWER_BONUS: 50,
  SLOW_ANSWER_PENALTY: 50,
  LIVES_BONUS: 50
});

const Time = Object.freeze({
  TOTAL: 30,
  QUICK_ANSWER_TIME_REMAINED: 20,
  SLOW_ANSWER_TIME_REMAINED: 10
});

const initialState = Object.freeze({
  gameNumber: 0,
  time: Time.TOTAL,
  livesRemained: 3,
  userAnswers: [],
  answersStats: new Array(10).fill(`unknown`),
  gameResult: -1
});

export {Points, Time, initialState};
