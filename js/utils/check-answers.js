const answerIsSelected = (answers) => {
  for (const answer of answers) {
    if (answer.checked) {
      return true;
    }
  }
  return false;
};

export default answerIsSelected;
