const QUICK_ANSWER_TIME_REMAINED = 20;
const SLOW_ANSWER_TIME_REMAINED = 10;

const checkTimeRemained = (timeRemained) => {
  if (timeRemained > QUICK_ANSWER_TIME_REMAINED) {
    return 150;
  } else if (timeRemained < SLOW_ANSWER_TIME_REMAINED) {
    return 50;
  } else {
    return 100;
  }
};

const getGameResult = (userAnswers, livesRemained) => {
  if (!(userAnswers instanceof Array)) {
    throw new Error(`Ошибка: ответы пользователя должны быть массивом`);
  }
  if (typeof livesRemained !== `number`) {
    throw new Error(`Ошибка: количество оставшихся жизней должно быть числом`);
  }
  if (livesRemained < 0) {
    return -1;
  }
  let total = 0;
  for (const answer of userAnswers) {
    if (typeof answer.isCorrectAnswer !== `boolean`) {
      throw new Error(`Ошибка: ответ пользователя должен быть логическим значением`);
    }
    if (typeof answer.timeRemained !== `number` || answer.timeRemained < 0 || answer.timeRemained > 30) {
      throw new Error(`Ошибка: оставшееся время должно быть числом от 0 до 30`);
    }
    if (!answer.isCorrectAnswer) {
      continue;
    }
    total += checkTimeRemained(answer.timeRemained);
  }
  total += (livesRemained * 50);
  return total;
};

export default getGameResult;
