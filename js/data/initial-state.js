const initialState = Object.freeze({
  gameNumber: 0,
  timer: 30,
  livesRemained: 3,
  answersStats: new Array(10).fill(`unknown`)
});

export default initialState;
