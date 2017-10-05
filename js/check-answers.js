function answerIsSelected(answers) {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked === true) {
      return true;
    }
  }
  return false;
}

export default answerIsSelected;
