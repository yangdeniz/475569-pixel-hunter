import {TimeRemained, Points} from './data';

export default (answers, lives) => {
  if (!(answers instanceof Array)) {
    throw new Error(`Ошибка: не переданы ответы пользователя`);
  }
  if (typeof lives !== `number`) {
    throw new Error(`Ошибка: не передано количество оставшихся жизней`);
  }

  let correctAnswers = 0;
  let quickAnswers = 0;
  let slowAnswers = 0;

  for (const answer of answers) {
    if (typeof answer.isCorrect !== `boolean`) {
      throw new Error(`Ошибка: ответ пользователя должен быть логическим значением`);
    }
    if (typeof answer.timeRemained !== `number` || answer.timeRemained < 0 || answer.timeRemained > TimeRemained.TOTAL) {
      throw new Error(`Ошибка: оставшееся время должно быть числом от 0 до 30`);
    }
    if (!answer.isCorrect) {
      continue;
    }
    correctAnswers++;
    if (answer.timeRemained > TimeRemained.QUICK_ANSWER) {
      quickAnswers++;
    } else if (answer.timeRemained < TimeRemained.SLOW_ANSWER) {
      slowAnswers++;
    }
  }

  if (lives < 0) {
    return -1;
  }

  const gameResult = {
    correct: {
      answers: correctAnswers,
      points: Points.CORRECT_ANSWER_POINTS,
      getResult() {
        return this.answers * this.points;
      }
    },
    quick: {
      answers: quickAnswers,
      points: Points.QUICK_ANSWER_BONUS,
      getResult() {
        return this.answers * this.points;
      }
    },
    slow: {
      answers: slowAnswers,
      points: Points.SLOW_ANSWER_PENALTY,
      getResult() {
        return this.answers * -this.points;
      }
    },
    lives: {
      total: lives,
      points: Points.LIVES_BONUS,
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
