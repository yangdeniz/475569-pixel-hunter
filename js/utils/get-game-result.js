import {Time} from '../data/data';

const getGameResult = (answers, lives, points) => {
  if (!(answers instanceof Array)) {
    throw new Error(`Ошибка: не переданы ответы пользователя`);
  }
  if (typeof lives !== `number`) {
    throw new Error(`Ошибка: не передано количество оставшихся жизней`);
  }
  if (!(points instanceof Object)) {
    throw new Error(`Ошибка: не переданы очки`);
  }

  let correctAnswers = 0;
  let quickAnswers = 0;
  let slowAnswers = 0;

  for (const answer of answers) {
    if (typeof answer.isCorrectAnswer !== `boolean`) {
      throw new Error(`Ошибка: ответ пользователя должен быть логическим значением`);
    }
    if (typeof answer.timeRemained !== `number` || answer.timeRemained < 0 || answer.timeRemained > Time.TIME_TOTAL) {
      throw new Error(`Ошибка: оставшееся время должно быть числом от 0 до 30`);
    }
    if (!answer.isCorrectAnswer) {
      continue;
    }
    correctAnswers++;
    if (answer.timeRemained > Time.QUICK_ANSWER_TIME_REMAINED) {
      quickAnswers++;
    } else if (answer.timeRemained < Time.SLOW_ANSWER_TIME_REMAINED) {
      slowAnswers++;
    }
  }

  if (lives < 0) {
    return -1;
  }

  const pointsCorrect = correctAnswers * points.CORRECT_ANSWER_POINTS;
  const pointsQuick = quickAnswers * points.QUICK_ANSWER_BONUS;
  const pointsSlow = slowAnswers * -points.SLOW_ANSWER_PENALTY;
  const pointsLives = lives * points.LIVES_BONUS;
  const pointsTotal = pointsCorrect + pointsQuick + pointsSlow + pointsLives;

  const gameResult = {
    correct: {
      answers: correctAnswers,
      points: points.CORRECT_ANSWER_POINTS,
      result: pointsCorrect
    },
    quick: {
      answers: quickAnswers,
      points: points.QUICK_ANSWER_BONUS,
      result: pointsQuick
    },
    slow: {
      answers: slowAnswers,
      points: points.SLOW_ANSWER_PENALTY,
      result: pointsSlow
    },
    lives: {
      total: lives,
      points: points.LIVES_BONUS,
      result: pointsLives
    },
    total: pointsTotal
  };

  return gameResult;
};

export default getGameResult;
