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

  const questContent = new Set();
  for (const item of answers) {
    if (!(item instanceof Object) || !(item.image instanceof Object) || (typeof item.type !== `string`)) {
      throw new Error(`Неверный формат ответа`);
    }

    const adaptedAnswer = {};
    adaptedAnswer[`number`] = answers.indexOf(item) + 1;
    adaptedAnswer[`image`] = item.image;
    if (answers.length === 3) {
      adaptedAnswer[`isCorrectAnswer`] = item.type === getCorrectAnswer(answers);
    } else {
      adaptedAnswer[`answer`] = (item.type === `painting`) ? `paint` : `photo`;
    }
    questContent.add(adaptedAnswer);
  }

  return questContent;

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
