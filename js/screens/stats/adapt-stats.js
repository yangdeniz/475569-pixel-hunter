import {Points, AnswerTypes} from '../../data/data';

const getResult = (item) => {
  let wrongAnswers = 0;
  let correctAnswers = 0;
  let quickAnswers = 0;
  let slowAnswers = 0;

  for (const answer of item.stats) {
    switch (answer) {
      case AnswerTypes.WRONG:
        wrongAnswers++;
        break;
      case AnswerTypes.CORRECT:
        correctAnswers++;
        break;
      case AnswerTypes.FAST:
        correctAnswers++;
        quickAnswers++;
        break;
      case AnswerTypes.SLOW:
        correctAnswers++;
        slowAnswers++;
        break;
    }
  }

  if (wrongAnswers > 3) {
    return -1;
  }

  const result = {
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
      total: item.lives,
      points: Points.LIVES_BONUS,
      getResult() {
        return this.total * this.points;
      }
    },
    getTotal() {
      return this.correct.getResult() + this.quick.getResult() + this.slow.getResult() + this.lives.getResult();
    }
  };

  return result;
};

export default (stats) => {
  if (!(stats instanceof Array)) {
    throw new Error(`Нет данных о пройденных играх или неверный формат данных`);
  }

  const adapted = [];

  for (const item of stats) {
    if (!(item instanceof Object) || !(item.stats instanceof Array)) {
      throw new Error(`Неверный формат ответа`);
    }
    const answers = [...item.stats];

    while (answers.length < 10) {
      answers.push(`unknown`);
    }

    const result = (item.stats.length < 10) ? -1 : getResult(item);

    const adaptedItem = {
      answersStats: answers,
      gameResult: result
    };

    adapted.push(adaptedItem);
  }

  return adapted;
};
