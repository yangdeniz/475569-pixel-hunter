import {Points} from '../../data/data';

const Result = {
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`
};

const getResult = (item) => {
  let wrongAnswers = 0;
  let correctAnswers = 0;
  let quickAnswers = 0;
  let slowAnswers = 0;

  for (const answer of item.stats) {
    switch (answer) {
      case Result.WRONG:
        wrongAnswers++;
        break;
      case Result.CORRECT:
        correctAnswers++;
        break;
      case Result.FAST:
        correctAnswers++;
        quickAnswers++;
        break;
      case Result.SLOW:
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
    if (!(item instanceof Object) || !(item.stats instanceof Array) || (typeof item.lives !== `number`)) {
      continue;
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
