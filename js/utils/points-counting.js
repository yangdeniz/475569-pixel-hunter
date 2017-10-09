const CORRECT_ANSWER_POINTS = 100;
const TIME_BONUS = 50;

const QUICK_ANSWER_TIME_REMAINED = 20;
const SLOW_ANSWER_TIME_REMAINED = 10;

const countCorrectAnswerPoints = (timeRemained) => {
  let total = CORRECT_ANSWER_POINTS;
  if (timeRemained > QUICK_ANSWER_TIME_REMAINED) {
    total += TIME_BONUS;
  } else if (timeRemained < SLOW_ANSWER_TIME_REMAINED) {
    total -= TIME_BONUS;
  }
  return total;
};

const getGameResult = (userAnswers, livesRemained) => {
  if (!(userAnswers instanceof Array)) {
    throw new Error(`Ошибка: ответы пользователя должны быть массивом`);
  }
  if (typeof livesRemained !== `number`) {
    throw new Error(`Ошибка: количество оставшихся жизней должно быть числом`);
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
    total += countCorrectAnswerPoints(answer.timeRemained);
  }
  if (livesRemained < 0) {
    return -1;
  }
  total += (livesRemained * 50);
  return total;
};

export default getGameResult;
