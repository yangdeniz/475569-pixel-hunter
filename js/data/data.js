const Points = Object.freeze({
  CORRECT_ANSWER_POINTS: 100,
  QUICK_ANSWER_BONUS: 50,
  SLOW_ANSWER_PENALTY: 50,
  LIVES_BONUS: 50
});

const TimeRemained = Object.freeze({
  TOTAL: 30,
  QUICK_ANSWER: 20,
  SLOW_ANSWER: 10
});

const AnswerTypes = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};

const initialState = Object.freeze({
  gameNumber: 0,
  time: TimeRemained.TOTAL,
  livesRemained: 3,
  userAnswers: [],
  answersStats: new Array(10).fill(`unknown`),
  gameResult: -1
});

export {Points, TimeRemained, AnswerTypes, initialState};
