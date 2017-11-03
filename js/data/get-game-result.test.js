import assert from 'assert';
import getGameResult from './get-game-result';

const answersNotFull = [
  {isCorrect: false, timeRemained: 15},
  {isCorrect: true, timeRemained: 20},
  {isCorrect: false, timeRemained: 5},
  {isCorrect: false, timeRemained: 12},
  {isCorrect: true, timeRemained: 24},
  {isCorrect: false, timeRemained: 22}
];

const answersNormal = [
  {isCorrect: true, timeRemained: 15},
  {isCorrect: true, timeRemained: 11},
  {isCorrect: true, timeRemained: 18},
  {isCorrect: true, timeRemained: 14},
  {isCorrect: true, timeRemained: 15},
  {isCorrect: true, timeRemained: 12},
  {isCorrect: true, timeRemained: 10},
  {isCorrect: true, timeRemained: 20},
  {isCorrect: true, timeRemained: 13},
  {isCorrect: true, timeRemained: 14},
];

const answersSlow = [
  {isCorrect: true, timeRemained: 9},
  {isCorrect: true, timeRemained: 4},
  {isCorrect: true, timeRemained: 6},
  {isCorrect: true, timeRemained: 4},
  {isCorrect: true, timeRemained: 2},
  {isCorrect: true, timeRemained: 7},
  {isCorrect: true, timeRemained: 5},
  {isCorrect: true, timeRemained: 9},
  {isCorrect: true, timeRemained: 8},
  {isCorrect: true, timeRemained: 4},
];

const answersQuick = [
  {isCorrect: true, timeRemained: 21},
  {isCorrect: true, timeRemained: 25},
  {isCorrect: true, timeRemained: 24},
  {isCorrect: true, timeRemained: 28},
  {isCorrect: true, timeRemained: 23},
  {isCorrect: true, timeRemained: 22},
  {isCorrect: true, timeRemained: 21},
  {isCorrect: true, timeRemained: 26},
  {isCorrect: true, timeRemained: 25},
  {isCorrect: true, timeRemained: 24},
];

const oneMistakeAnswers = [
  {isCorrect: true, timeRemained: 10},
  {isCorrect: true, timeRemained: 15},
  {isCorrect: true, timeRemained: 18},
  {isCorrect: true, timeRemained: 13},
  {isCorrect: true, timeRemained: 12},
  {isCorrect: false, timeRemained: 10},
  {isCorrect: true, timeRemained: 19},
  {isCorrect: true, timeRemained: 11},
  {isCorrect: true, timeRemained: 17},
  {isCorrect: true, timeRemained: 15},
];

const twoMistakesAnswers = [
  {isCorrect: true, timeRemained: 12},
  {isCorrect: false, timeRemained: 15},
  {isCorrect: true, timeRemained: 15},
  {isCorrect: true, timeRemained: 18},
  {isCorrect: true, timeRemained: 12},
  {isCorrect: true, timeRemained: 14},
  {isCorrect: true, timeRemained: 19},
  {isCorrect: false, timeRemained: 11},
  {isCorrect: true, timeRemained: 16},
  {isCorrect: true, timeRemained: 18},
];

const threeMistakesAnswers = [
  {isCorrect: true, timeRemained: 16},
  {isCorrect: true, timeRemained: 13},
  {isCorrect: true, timeRemained: 19},
  {isCorrect: false, timeRemained: 14},
  {isCorrect: true, timeRemained: 11},
  {isCorrect: false, timeRemained: 10},
  {isCorrect: true, timeRemained: 20},
  {isCorrect: true, timeRemained: 15},
  {isCorrect: true, timeRemained: 17},
  {isCorrect: false, timeRemained: 13},
];

describe(`Points counting function`, () => {

  it(`Функция должна вернуть -1, если игрок допустил четыре ошибки`, () => {
    assert.equal(getGameResult(answersNotFull, -1), -1);
  });

  it(`Функция должна вернуть 1150, если все ответы верны и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(answersNormal, 3).getTotal(), 1150);
  });

  it(`Функция должна вернуть 1650, если все ответы верны и на каждый ответ затрачено меньше 10 сек.`, () => {
    assert.equal(getGameResult(answersQuick, 3).getTotal(), 1650);
  });

  it(`Функция должна вернуть 650, если все ответы верны и на каждый ответ затрачено больше 20 сек.`, () => {
    assert.equal(getGameResult(answersSlow, 3).getTotal(), 650);
  });

  it(`Функция должна вернуть 1000, если допущена одна ошибка и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(oneMistakeAnswers, 2).getTotal(), 1000);
  });

  it(`Функция должна вернуть 850, если допущено две ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(twoMistakesAnswers, 1).getTotal(), 850);
  });

  it(`Функция должна вернуть 700, если допущено три ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult(threeMistakesAnswers, 0).getTotal(), 700);
  });

  it(`Функция выкидывает ошибку, если не переданы ответы пользователя или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(), Error);
    assert.throws(() => getGameResult(null, 3), Error);
  });

  it(`Функция выкидывает ошибку, если не передано количество жизней или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(answersNormal), Error);
    assert.throws(() => getGameResult(answersNormal, null), Error);
    assert.throws(() => getGameResult(answersNormal, `3`), Error);
  });

  it(`Функция выкидывает ошибку, если один из ответов пользователя не передан или передано некорректное значение`, () => {
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: null, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: 32, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: `true`, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
  });

  it(`Функция выкидывает ошибку, если оставшееся время не является числом от 0 до 30`, () => {
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: null},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: `17`},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: -3},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 10},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
    assert.throws(() => getGameResult([
      {isCorrect: true, timeRemained: 25},
      {isCorrect: true, timeRemained: 13},
      {isCorrect: true, timeRemained: 19},
      {isCorrect: false, timeRemained: 14},
      {isCorrect: true, timeRemained: 11},
      {isCorrect: false, timeRemained: 35},
      {isCorrect: true, timeRemained: 20},
      {isCorrect: true, timeRemained: 15},
      {isCorrect: true, timeRemained: 17},
      {isCorrect: false, timeRemained: 13},
    ], 0), Error);
  });

});
