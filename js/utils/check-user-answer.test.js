import assert from 'assert';
import isCorrectAnswer from './check-user-answer';

describe(`Checking user answer function`, () => {

  it(`Функция возвращает true, если ответ пользователя совпадает с правильным ответом`, () => {
    assert.equal(isCorrectAnswer({questionNumber: 0, content: [`photo`, `picture`]}), true);
    assert.equal(isCorrectAnswer({questionNumber: 1, content: [`photo`]}), true);
    assert.equal(isCorrectAnswer({questionNumber: 2, content: 1}), true);
  });

  it(`Функция возвращает false, если ответ пользователя не совпадает с правильным ответом`, () => {
    assert.equal(isCorrectAnswer({questionNumber: 0, content: [`photo`, `photo`]}), false);
    assert.equal(isCorrectAnswer({questionNumber: 0, content: [`picture`, `picture`]}), false);
    assert.equal(isCorrectAnswer({questionNumber: 1, content: [`picture`]}), false);
    assert.equal(isCorrectAnswer({questionNumber: 2, content: 0}), false);
  });

  it(`Функция выкидывает ошибку, если ответ пользователя не передан или передано некорректное значение`, () => {
    assert.throws(() => isCorrectAnswer(undefined), Error);
    assert.throws(() => isCorrectAnswer(null), Error);
    assert.throws(() => isCorrectAnswer(`picture`), Error);
  });

  it(`Функция выкидывает ошибку, если не передан номер вопроса или передано некорректное значение`, () => {
    assert.throws(() => isCorrectAnswer({questionNumber: undefined, content: [`photo`, `picture`]}), Error);
    assert.throws(() => isCorrectAnswer({questionNumber: null, content: [`photo`, `picture`]}), Error);
    assert.throws(() => isCorrectAnswer({questionNumber: `0`, content: [`photo`, `picture`]}), Error);
  });

  it(`Функция выкидывает ошибку, если не передано содержание ответа или передано некорректное значение`, () => {
    assert.throws(() => isCorrectAnswer({questionNumber: 0, content: undefined}), Error);
    assert.throws(() => isCorrectAnswer({questionNumber: 0, content: null}), Error);
    assert.throws(() => isCorrectAnswer({questionNumber: 0, content: `photo`}), Error);
    assert.throws(() => isCorrectAnswer({questionNumber: 0, content: 1}), Error);
    assert.throws(() => isCorrectAnswer({questionNumber: 3, content: [`photo`, `picture`]}), Error);
  });

});
