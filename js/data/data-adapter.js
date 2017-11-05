const ONE_OF_THREE_QUESTION_ANSWERS_TOTAL = 3;

const getCorrectAnswer = (answers) => {
  let paint = 0;
  let photo = 0;
  for (const answer of answers) {
    if (answer.type === `photo`) {
      photo++;
    } else if (answer.type === `painting`) {
      paint++;
    }
  }
  const correctAnswer = (photo < paint) ? `photo` : `painting`;
  return correctAnswer;
};

const adaptAnswers = (answers) => {
  if (answers.length === 0) {
    throw new Error(`Отсутствуют ответы`);
  }

  const adaptedAnswers = new Set();
  for (const answer of answers) {
    if (!(answer instanceof Object) || !(answer.image instanceof Object) || (typeof answer.type !== `string`)) {
      throw new Error(`Неверный формат ответа`);
    }

    const adaptedAnswer = {};
    adaptedAnswer[`number`] = answers.indexOf(answer) + 1;
    adaptedAnswer[`image`] = answer.image;
    if (answers.length === ONE_OF_THREE_QUESTION_ANSWERS_TOTAL) {
      adaptedAnswer[`isCorrectAnswer`] = (answer.type === getCorrectAnswer(answers));
    } else {
      adaptedAnswer[`answer`] = (answer.type === `painting`) ? `paint` : `photo`;
    }
    adaptedAnswers.add(adaptedAnswer);
  }

  return adaptedAnswers;
};

export default (data) => {
  if (!(data instanceof Array)) {
    throw new Error(`Неверный формат данных`);
  }

  const adapted = [];

  for (const item of data) {
    if (!(item instanceof Object) || (typeof item.question !== `string`) || !(item.answers instanceof Array)) {
      throw new Error(`Неверный формат вопроса ${data.indexOf(item)}`);
    }
    const question = {};
    question[`task`] = item.question;
    question[`content`] = adaptAnswers(item.answers);
    adapted.push(question);
  }

  return adapted;
};
