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
  const questContent = new Set();
  for (const item of answers) {
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
  const adapted = [];
  for (const item of data) {
    const question = {};
    question[`task`] = item[`question`];
    question[`content`] = adaptAnswers(item[`answers`]);
    adapted.push(question);
  }
  return adapted;
};
