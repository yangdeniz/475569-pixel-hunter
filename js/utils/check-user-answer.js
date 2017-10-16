import questions from '../data/questions';

const answerIsCorrect = (userAnswer) => {

  if (!(userAnswer instanceof Object)) {
    throw new Error(`Ошибка: некорректный формат ответа пользователя`);
  }
  if (typeof userAnswer.questionNumber !== `number`) {
    throw new Error(`Ошибка: некорректный формат номера вопроса`);
  }

  const correctAnswer = [...questions[userAnswer.questionNumber].content];

  if ((correctAnswer[0].answer && !(userAnswer.content instanceof Array))
  || (correctAnswer[0].isCorrectAnswer && (typeof userAnswer.content !== `number`))) {
    throw new Error(`Ошибка: некорректный формат содержания ответа`);
  }

  if (userAnswer.content instanceof Array) {
    for (let i = 0; i < userAnswer.content.length; i++) {
      if (userAnswer.content[i] !== correctAnswer[i].answer) {
        return false;
      }
    }
  } else {
    if (!correctAnswer[userAnswer.content].isCorrectAnswer) {
      return false;
    }
  }
  return true;
};

export default answerIsCorrect;
