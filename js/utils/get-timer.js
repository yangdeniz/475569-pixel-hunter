const getTimer = (timeInSeconds) => {
  return {
    time: timeInSeconds,
    tick() {
      if (this.time <= 0) {
        return `Время вышло!`;
      }
      return getTimer(this.time - 1);
    }
  };
};

export default getTimer;
