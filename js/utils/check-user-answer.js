export default (answer, question) => {

  if (!(question instanceof Object)) {
    throw new Error(`Ошибка: некорректный формат вопроса`);
  }

  const correctAnswer = [...question.content];

  if ((correctAnswer[0].hasOwnProperty(`answer`) && !(answer instanceof Array))
  || (correctAnswer[0].hasOwnProperty(`isCorrectAnswer`) && (typeof answer !== `number`))) {
    throw new Error(`Ошибка: некорректный формат ответа`);
  }

  if (answer instanceof Array) {
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] !== correctAnswer[i].answer) {
        return false;
      }
    }
  } else if (!correctAnswer[answer].isCorrectAnswer) {
    return false;
  }
  return true;
};
