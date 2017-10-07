import assert from 'assert';
import getTimer from './get-timer';

describe(`Timer function`, () => {

  it(`При вызове метода tick время уменьшается на 1`, () => {
    assert.equal(getTimer(30).tick().time, 29);
    assert.notEqual(getTimer(29).tick().time, 29);
  });

  it(`Если время равно 0, вызов метода tick выводит соответствующее сообщение`, () => {
    assert.equal(getTimer(0).tick(), `Время вышло!`);
    assert.notEqual(getTimer(0).tick().time, -1);
  });

});
