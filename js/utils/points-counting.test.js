import assert from 'assert';
import getGameResult from './points-counting';

describe(`Points counting function`, () => {

  // Тесты на корректность подсчета результатов игры

  it(`функция должна вернуть -1, если игрок допустил четыре ошибки`, () => {
    assert.equal(getGameResult([
      {isCorrectAnswer: false, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: false, timeRemained: 5},
      {isCorrectAnswer: false, timeRemained: 12},
      {isCorrectAnswer: true, timeRemained: 24},
      {isCorrectAnswer: false, timeRemained: 22}
    ], -1), -1);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 24},
      {isCorrectAnswer: false, timeRemained: 4},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: false, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 2},
    ], 0), -1);
  });

  it(`функция должна вернуть 1150, если все ответы верны и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult([
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
    ], 3), 1150);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 18},
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: true, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 14},
    ], 3), 1150);
  });

  it(`функция должна вернуть 1650, если все ответы верны и на каждый ответ затрачено меньше 10 сек.`, () => {
    assert.equal(getGameResult([
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
    ], 3), 1650);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 21},
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 24},
      {isCorrectAnswer: true, timeRemained: 28},
      {isCorrectAnswer: true, timeRemained: 23},
      {isCorrectAnswer: true, timeRemained: 22},
      {isCorrectAnswer: true, timeRemained: 21},
      {isCorrectAnswer: true, timeRemained: 5},
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 24},
    ], 3), 1650);
  });

  it(`функция должна вернуть 650, если все ответы верны и на каждый ответ затрачено больше 20 сек.`, () => {
    assert.equal(getGameResult([
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
    ], 3), 650);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 9},
      {isCorrectAnswer: true, timeRemained: 4},
      {isCorrectAnswer: true, timeRemained: 6},
      {isCorrectAnswer: true, timeRemained: 4},
      {isCorrectAnswer: true, timeRemained: 2},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 5},
      {isCorrectAnswer: true, timeRemained: 9},
      {isCorrectAnswer: true, timeRemained: 8},
      {isCorrectAnswer: true, timeRemained: 4},
    ], 3), 650);
  });

  it(`функция должна вернуть 1000, если допущена одна ошибка и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult([
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
    ], 2), 1000);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 18},
      {isCorrectAnswer: true, timeRemained: 24},
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: true, timeRemained: 15},
    ], 2), 1000);
  });

  it(`функция должна вернуть 850, если допущено две ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult([
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
    ], 1), 850);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: false, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 18},
      {isCorrectAnswer: true, timeRemained: 12},
      {isCorrectAnswer: true, timeRemained: 3},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 11},
      {isCorrectAnswer: true, timeRemained: 16},
      {isCorrectAnswer: true, timeRemained: 18},
    ], 1), 850);
  });

  it(`функция должна вернуть 700, если допущено три ошибки и на каждый ответ затрачено от 10 до 20 сек.`, () => {
    assert.equal(getGameResult([
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
    ], 0), 700);
    assert.notEqual(getGameResult([
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ], 0), 700);
  });

  // Тесты на корректность значений переданных параметров

  it(`функция выкидывает ошибку, если не передан массив ответов или передано некорректное значение`, () => {
    assert.throws(() => getGameResult(undefined, 3), Error);
    assert.throws(() => getGameResult(null, 3), Error);
  });

  it(`функция выкидывает ошибку, если не передано количество жизней или передано некорректное значение`, () => {
    assert.throws(() => getGameResult([
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ], undefined), Error);
    assert.throws(() => getGameResult([
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ], null), Error);
    assert.throws(() => getGameResult([
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ], `0`), Error);
  });

  it(`Функция выкидывает ошибку, если один из ответов пользователя не передан или передано некорректное значение`, () => {
    assert.throws(() => getGameResult([
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: 10},
      {isCorrectAnswer: undefined, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ], 0), Error);
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
    ], 0), Error);
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
    ], 0), Error);
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
    ], 0), Error);
  });

  it(`Функция выкидывает ошибку, если оставшееся время не является числом от 0 до 30`, () => {
    assert.throws(() => getGameResult([
      {isCorrectAnswer: true, timeRemained: 25},
      {isCorrectAnswer: true, timeRemained: 13},
      {isCorrectAnswer: true, timeRemained: 19},
      {isCorrectAnswer: false, timeRemained: 14},
      {isCorrectAnswer: true, timeRemained: 11},
      {isCorrectAnswer: false, timeRemained: undefined},
      {isCorrectAnswer: true, timeRemained: 20},
      {isCorrectAnswer: true, timeRemained: 15},
      {isCorrectAnswer: true, timeRemained: 17},
      {isCorrectAnswer: false, timeRemained: 13},
    ], 0), Error);
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
    ], 0), Error);
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
    ], 0), Error);
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
    ], 0), Error);
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
    ], 0), Error);
  });

});
