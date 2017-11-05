export default (answer, question) => {
  if (!(question instanceof Object)) {
    throw new Error(`Ошибка: некорректный формат вопроса`);
  }

  const questionContent = [...question.content];

  if ((questionContent[0].hasOwnProperty(`answer`) && !(answer instanceof Array))
  || (questionContent[0].hasOwnProperty(`isCorrectAnswer`) && (typeof answer !== `number`))) {
    throw new Error(`Ошибка: некорректный формат ответа`);
  }

  if (answer instanceof Array) {
    let counter = 0;
    for (const item of answer) {
      const correctAnswer = questionContent[counter].answer;
      counter++;
      if (item !== correctAnswer) {
        return false;
      }
    }
  } else if (!questionContent[answer].isCorrectAnswer) {
    return false;
  }
  return true;
};
