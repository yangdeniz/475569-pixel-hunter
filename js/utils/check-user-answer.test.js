import assert from 'assert';
import isCorrectAnswer from './check-user-answer';

describe(`Checking user answer function`, () => {

  const questionGuessTwoImages = {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        answer: `photo`
      },
      {
        number: `2`,
        image: {
          src: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        answer: `paint`
      }
    ])
  };

  const questionGuessOneImage = {
    task: `Угадай, фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `http://placehold.it/705x455`,
          width: 705,
          height: 455
        },
        answer: `photo`
      }
    ])
  };

  const questionChooseOneOfThree = {
    task: `Найдите рисунок среди изображений`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: `2`,
        image: {
          src: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: true
      },
      {
        number: `3`,
        image: {
          src: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      }
    ])
  };

  it(`Функция возвращает true, если ответ пользователя совпадает с правильным ответом`, () => {
    assert.equal(isCorrectAnswer([`photo`, `paint`], questionGuessTwoImages), true);
    assert.equal(isCorrectAnswer([`photo`], questionGuessOneImage), true);
    assert.equal(isCorrectAnswer(1, questionChooseOneOfThree), true);
  });

  it(`Функция возвращает false, если ответ пользователя не совпадает с правильным ответом`, () => {
    assert.equal(isCorrectAnswer([`photo`, `photo`], questionGuessTwoImages), false);
    assert.equal(isCorrectAnswer([`paint`, `paint`], questionGuessTwoImages), false);
    assert.equal(isCorrectAnswer([`paint`], questionGuessOneImage), false);
    assert.equal(isCorrectAnswer(0, questionChooseOneOfThree), false);
  });

  it(`Функция выкидывает ошибку, если ответ пользователя не передан или передано некорректное значение`, () => {
    assert.throws(() => isCorrectAnswer(), Error);
    assert.throws(() => isCorrectAnswer(null, questionGuessTwoImages), Error);
    assert.throws(() => isCorrectAnswer(`picture`, questionGuessTwoImages), Error);
    assert.throws(() => isCorrectAnswer(1, questionGuessTwoImages), Error);
    assert.throws(() => isCorrectAnswer([`picture`, `photo`], questionChooseOneOfThree), Error);
  });

  it(`Функция выкидывает ошибку, если не передан вопрос, или передано некорректное значение`, () => {
    assert.throws(() => isCorrectAnswer([`photo`, `paint`]), Error);
    assert.throws(() => isCorrectAnswer([`photo`, `paint`], null), Error);
    assert.throws(() => isCorrectAnswer([`photo`, `paint`], 1), Error);
    assert.throws(() => isCorrectAnswer([`photo`, `paint`], `photo`), Error);
  });

});
