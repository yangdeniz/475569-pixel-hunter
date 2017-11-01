import assert from 'assert';
import getGameResult from './get-game-result';

describe(`Points counting function`, () => {

  const Points = Object.freeze({
    CORRECT_ANSWER_POINTS: 100,
    QUICK_ANSWER_BONUS: 50,
    SLOW_ANSWER_PENALTY: 50,
    LIVES_BONUS: 50
  });

  const answersNotFull = [
    {isCorrectAnswer: false, timeRemained: 15},
    {isCorrectAnswer: true, timeRemained: 20},
    {isCorrectAnswer: false, timeRemained: 5},
    {isCorrectAnswer: false, timeRemained: 12},
    {isCorrectAnswer: true, timeRemained: 24},
    {isCorrectAnswer: false, timeRemained: 22}
  ];

  const answersNormal = [
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
  ];

  const answersSlow = [
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
  ];

  const answersQuick = [
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
  ];

  const oneMistakeAnswers = [
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
  ];

  const twoMistakesAnswers = [
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
  ];

  const threeMistakesAnswers = [
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
  ];

  it(`Функция должна вернуть -1, если игрок допустил четыре ошибки`, () => {
    assert.equal(getGameResult(answersNotFull, -1, Points), -1);
  });

  it(`Функция должна вернуть 1150, если все ответы верны и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(answersNormal, 3, Points).getTotal(), 1150);
  });

  it(`Функция должна вернуть 1650, если все ответы верны и на каждый ответ затрачено меньше 10 сек.`, () => {
    assert.equal(getGameResult(answersQuick, 3, Points).getTotal(), 1650);
  });

  it(`Функция должна вернуть 650, если все ответы верны и на каждый ответ затрачено больше 20 сек.`, () => {
    assert.equal(getGameResult(answersSlow, 3, Points).getTotal(), 650);
  });

  it(`Функция должна вернуть 1000, если допущена одна ошибка и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(oneMistakeAnswers, 2, Points).getTotal(), 1000);
  });

  it(`Функция должна вернуть 850, если допущено две ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(twoMistakesAnswers, 1, Points).getTotal(), 850);
  });

  it(`Функция должна вернуть 700, если допущено три ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(threeMistakesAnswers, 0, Points).getTotal(), 700);
  });

  it(`Функция выкидывает ошибку, если не переданы ответы пользователя или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(), Error);
    assert.throws(() => getGameResult(null, 3, Points), Error);
  });

  it(`Функция выкидывает ошибку, если не передано количество жизней или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(answersNormal), Error);
    assert.throws(() => getGameResult(answersNormal, null, Points), Error);
    assert.throws(() => getGameResult(answersNormal, `3`, Points), Error);
  });

  it(`Функция выкидывает ошибку, если не переданы очки или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(answersNormal, 3), Error);
    assert.throws(() => getGameResult(answersNormal, 3, null), Error);
    assert.throws(() => getGameResult(answersNormal, 3, 100), Error);
  });

  it(`Функция выкидывает ошибку, если один из ответов пользователя не передан или передано некорректное значение`, () => {
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
  });

  it(`Функция выкидывает ошибку, если оставшееся время не является числом от 0 до 30`, () => {
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
    assert.throws(() => getGameResult([
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
    ], 0, Points), Error);
  });

});
