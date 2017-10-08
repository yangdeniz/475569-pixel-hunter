const getTimer = (timeInSeconds) => {
  if (typeof timeInSeconds !== `number` || timeInSeconds < 0) {
    throw new Error(`Ошибка: введено некорректное значение`);
  }
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
