import questions from './questions';

const initialState = Object.freeze({
  gameNumber: 0,
  question: questions[0],
  livesRemained: 3,
  userAnswers: [],
  answersStats: new Array(10).fill(`unknown`)
});

export default initialState;
