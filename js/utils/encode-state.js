import {questions} from '../data/data';

const answersCode = {
  unknown: `0`,
  wrong: `1`,
  slow: `2`,
  correct: `3`,
  fast: `4`
};

const getString = (number, length) => {
  let str = number.toString();
  while (str.length < length) {
    str = `0` + str;
  }
  return str;
};

const decodeGameResult = (code) => {
  const result = {
    correct: {
      answers: +code.slice(0, 2),
      points: +code.slice(2, 5),
      getResult() {
        return this.answers * this.points;
      }
    },
    quick: {
      answers: +code.slice(5, 7),
      points: +code.slice(7, 10),
      getResult() {
        return this.answers * this.points;
      }
    },
    slow: {
      answers: +code.slice(10, 12),
      points: +code.slice(12, 15),
      getResult() {
        return this.answers * -this.points;
      }
    },
    lives: {
      total: +code.slice(15, 17),
      points: +code.slice(17, 20),
      getResult() {
        return this.total * this.points;
      }
    },
    getTotal() {
      return this.correct.getResult() + this.quick.getResult() + this.slow.getResult() + this.lives.getResult();
    }
  };
  return result;
};

const encode = (state) => {
  let code = `n` + getString(state.gameNumber, 2) + `t` + getString(state.time, 2) + `l` + getString(state.livesRemained, 2) + `a`;

  for (const answer of state.userAnswers) {
    code += answer.isCorrectAnswer ? 1 : 0;
    code += getString(answer.timeRemained, 2);
  }

  code += `s`;
  for (const answer of state.answersStats) {
    code += answersCode[answer];
  }

  code += `r`;
  code += (state.gameResult === -1) ? state.gameResult : (getString(state.gameResult.correct.answers, 2)
  + getString(state.gameResult.correct.points, 3) + getString(state.gameResult.quick.answers, 2) + getString(state.gameResult.quick.points, 3)
  + getString(state.gameResult.slow.answers, 2) + getString(state.gameResult.slow.points, 3) + getString(state.gameResult.lives.total, 2)
  + getString(state.gameResult.lives.points, 3));

  return code;
};

const decode = (code) => {
  const number = +code.slice(1, 3);
  const timeLeft = +code.slice(4, 6);
  const lives = +code.slice(7, 9);

  const answers = [];
  const string = code.slice(code.indexOf(`a`) + 1, code.indexOf(`s`));
  for (let i = 0; i < string.length; i += 3) {
    const answer = {
      isCorrectAnswer: (string.slice(i, i + 1) === `1`),
      timeRemained: +string.slice(i + 1, i + 3)
    };
    answers.push(answer);
  }

  const stats = [];
  const string1 = code.slice(code.indexOf(`s`) + 1, code.indexOf(`r`));
  const answersCodeArr = Object.keys(answersCode);
  for (const sym of string1) {
    stats.push(answersCodeArr[+sym]);
  }

  const string2 = code.slice(code.indexOf(`r`) + 1);
  const result = (string2 === `-1`) ? -1 : decodeGameResult(string2);

  const state = {
    gameNumber: number,
    question: questions[number] || false,
    time: timeLeft,
    livesRemained: lives,
    userAnswers: answers,
    answersStats: stats,
    gameResult: result
  };

  return state;
};

export {encode, decode};
