const TIME_TOTAL = 30;
const QUICK_ANSWER_TIME_REMAINED = 20;
const SLOW_ANSWER_TIME_REMAINED = 10;

const getGameResult = (userAnswers, livesRemained, points) => {
  if (!(userAnswers instanceof Array)) {
    throw new Error(`Ошибка: ответы пользователя не являются массивом`);
  }
  if (typeof livesRemained !== `number`) {
    throw new Error(`Ошибка: количество оставшихся жизней не является числом`);
  }
  if (!(points instanceof Object)) {
    throw new Error(`Ошибка: очки не являются объектом`);
  }

  let correctAnswers = 0;
  let quickAnswers = 0;
  let slowAnswers = 0;

  for (const answer of userAnswers) {
    if (typeof answer.isCorrectAnswer !== `boolean`) {
      throw new Error(`Ошибка: ответ пользователя должен быть логическим значением`);
    }
    if (typeof answer.timeRemained !== `number` || answer.timeRemained < 0 || answer.timeRemained > TIME_TOTAL) {
      throw new Error(`Ошибка: оставшееся время должно быть числом от 0 до 30`);
    }
    if (!answer.isCorrectAnswer) {
      continue;
    }
    correctAnswers++;
    if (answer.timeRemained > QUICK_ANSWER_TIME_REMAINED) {
      quickAnswers++;
    } else if (answer.timeRemained < SLOW_ANSWER_TIME_REMAINED) {
      slowAnswers++;
    }
  }

  if (livesRemained < 0) {
    return -1;
  }

  const gameResult = {
    correct: {
      answers: correctAnswers,
      points: points.correctAnswerPoints,
      getResult() {
        return this.answers * this.points;
      }
    },
    quick: {
      answers: quickAnswers,
      points: points.quickAnswerBonus,
      getResult() {
        return this.answers * this.points;
      }
    },
    slow: {
      answers: slowAnswers,
      points: points.slowAnswerPenalty,
      getResult() {
        return this.answers * -this.points;
      }
    },
    lives: {
      total: livesRemained,
      points: points.livesBonus,
      getResult() {
        return this.total * this.points;
      }
    },
    getTotal() {
      return this.correct.getResult() + this.quick.getResult() + this.slow.getResult() + this.lives.getResult();
    }
  };

  return gameResult;
};

export default getGameResult;
