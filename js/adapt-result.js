export default (state) => {
  const data = {
    stats: state.answersStats,
    lives: state.livesRemained
  };
  return data;
};
