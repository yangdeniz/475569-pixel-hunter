import assert from 'assert';
import getGameResult from './get-game-result';

describe(`Points counting function`, () => {

  const points = Object.freeze({
    correctAnswerPoints: 100,
    quickAnswerBonus: 50,
    slowAnswerPenalty: 50,
    livesBonus: 50
  });

  const answersNotFull = {
    userAnswers: [
      {isCorrectAnswer: false, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: false, timeRemained: 5},
      {isCorrectAnswer: false, timeRemained: 12},
      {isCorrectAnswer: true, timeRemained: 24},
      {isCorrectAnswer: false, timeRemained: 22}
    ],
    livesRemained: -1
  };

  const answersNormal = {
    userAnswers: [
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 18},
      {isCorrectAnswer: true, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: true, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 14},
    ],
    livesRemained: 3
  };

  const answersSlow = {
    userAnswers: [
      {isCorrectAnswer: true, timeRemained: 9},
      {isCorrectAnswer: true, timeRemained: 4},
      {isCorrectAnswer: true, timeRemained: 6},
      {isCorrectAnswer: true, timeRemained: 4},
      {isCorrectAnswer: true, timeRemained: 2},
      {isCorrectAnswer: true, timeRemained: 7},
      {isCorrectAnswer: true, timeRemained: 5},
      {isCorrectAnswer: true, timeRemained: 9},
      {isCorrectAnswer: true, timeRemained: 8},
      {isCorrectAnswer: true, timeRemained: 4},
    ],
    livesRemained: 3
  };

  const answersQuick = {
    userAnswers: [
      {isCorrectAnswer: true, timeRemained: 21},
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 24},
      {isCorrectAnswer: true, timeRemained: 28},
      {isCorrectAnswer: true, timeRemained: 23},
      {isCorrectAnswer: true, timeRemained: 22},
      {isCorrectAnswer: true, timeRemained: 21},
      {isCorrectAnswer: true, timeRemained: 26},
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 24},
    ],
    livesRemained: 3
  };

  const oneMistakeAnswers = {
    userAnswers: [
      {isCorrectAnswer: true, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 18},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: true, timeRemained: 15},
    ],
    livesRemained: 2
  };

  const twoMistakesAnswers = {
    userAnswers: [
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: false, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 18},
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: true, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 16},
      {isCorrectAnswer: true, timeRemained: 18},
    ],
    livesRemained: 1
  };

  const threeMistakesAnswers = {
    userAnswers: [
      {isCorrectAnswer: true, timeRemained: 16},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ],
    livesRemained: 0
  };

  it(`Функция должна вернуть -1, если игрок допустил четыре ошибки`, () => {
    assert.equal(getGameResult(answersNotFull, points), -1);
  });

  it(`Функция должна вернуть 1150, если все ответы верны и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(answersNormal, points).getTotal(), 1150);
  });

  it(`Функция должна вернуть 1650, если все ответы верны и на каждый ответ затрачено меньше 10 сек.`, () => {
    assert.equal(getGameResult(answersQuick, points).getTotal(), 1650);
  });

  it(`Функция должна вернуть 650, если все ответы верны и на каждый ответ затрачено больше 20 сек.`, () => {
    assert.equal(getGameResult(answersSlow, points).getTotal(), 650);
  });

  it(`Функция должна вернуть 1000, если допущена одна ошибка и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(oneMistakeAnswers, points).getTotal(), 1000);
  });

  it(`Функция должна вернуть 850, если допущено две ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(twoMistakesAnswers, points).getTotal(), 850);
  });

  it(`Функция должна вернуть 700, если допущено три ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(threeMistakesAnswers, points).getTotal(), 700);
  });

  it(`Функция выкидывает ошибку, если не передано состояние игры или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(), Error);
    assert.throws(() => getGameResult(null, points), Error);
  });

  it(`Функция выкидывает ошибку, если не переданы очки или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(answersNormal), Error);
    assert.throws(() => getGameResult(answersNormal, null), Error);
    assert.throws(() => getGameResult(answersNormal, 100), Error);
  });

  it(`Функция выкидывает ошибку, если не переданы ответы пользователя или передано некорректное значение`, () => {
    assert.throws(() => getGameResult({livesRemained: 3}, points), Error);
    assert.throws(() => getGameResult({userAnswers: null, livesRemained: 3}, points), Error);
  });

  it(`Функция выкидывает ошибку, если не передано количество жизней или передано некорректное значение`, () => {
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: true, timeRemained: 18},
        {isCorrectAnswer: true, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 12},
        {isCorrectAnswer: true, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 14},
      ]
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: true, timeRemained: 18},
        {isCorrectAnswer: true, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 12},
        {isCorrectAnswer: true, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 14},
      ],
      livesRemained: null
    }, points), Error);
  });

  it(`Функция выкидывает ошибку, если один из ответов пользователя не передан или передано некорректное значение`, () => {
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: null, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: 32, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: `true`, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
  });

  it(`Функция выкидывает ошибку, если оставшееся время не является числом от 0 до 30`, () => {
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: null},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: `17`},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: -3},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 10},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
    assert.throws(() => getGameResult({
      userAnswers: [
        {isCorrectAnswer: true, timeRemained: 25},
        {isCorrectAnswer: true, timeRemained: 13},
        {isCorrectAnswer: true, timeRemained: 19},
        {isCorrectAnswer: false, timeRemained: 14},
        {isCorrectAnswer: true, timeRemained: 11},
        {isCorrectAnswer: false, timeRemained: 35},
        {isCorrectAnswer: true, timeRemained: 20},
        {isCorrectAnswer: true, timeRemained: 15},
        {isCorrectAnswer: true, timeRemained: 17},
        {isCorrectAnswer: false, timeRemained: 13},
      ],
      livesRemained: 0
    }, points), Error);
  });

});
