import assert from 'assert';
import adaptStats from './adapt-stats';

const input = [
  {
    date: 1234567567898,
    stats: [`correct`, `wrong`, `fast`, `wrong`, `correct`, `wrong`, `wrong`],
    lives: 0
  },
  {
    date: 1234567567898,
    stats: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`],
    lives: 0
  }
];

const output = [
  {
    answersStats: [`correct`, `wrong`, `fast`, `wrong`, `correct`, `wrong`, `wrong`, `unknown`, `unknown`, `unknown`],
    gameResult: -1
  },
  {
    answersStats: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`],
    gameResult: {
      correct: {
        answers: 7,
        points: 100,
        getResult() {
          return this.answers * this.points;
        }
      },
      quick: {
        answers: 2,
        points: 50,
        getResult() {
          return this.answers * this.points;
        }
      },
      slow: {
        answers: 2,
        points: 50,
        getResult() {
          return this.answers * -this.points;
        }
      },
      lives: {
        total: 0,
        points: 50,
        getResult() {
          return this.total * this.points;
        }
      },
      getTotal() {
        return this.correct.getResult() + this.quick.getResult() + this.slow.getResult() + this.lives.getResult();
      }
    }
  }
];

describe(`Stats adapter function`, () => {

  it(`Функция преобразовывает данные в формат, используемый в модулях`, () => {
    assert.deepEqual(adaptStats(input)[0].answersStats, output[0].answersStats);
    assert.deepEqual(adaptStats(input)[1].answersStats, output[1].answersStats);
    assert.equal(adaptStats(input)[0].gameResult, output[0].gameResult);
    assert.equal(adaptStats(input)[1].gameResult.getTotal(), output[1].gameResult.getTotal());
  });

  it(`Функция выкидывает ошибку, если переданы некорректные данные`, () => {
    assert.throws(() => adaptStats(), Error);
    assert.throws(() => adaptStats(null), Error);
  });

});
