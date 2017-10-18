import assert from 'assert';
import isCorrectAnswer from './check-user-answer';

describe(`Checking user answer function`, () => {

  it(`Функция возвращает true, если ответ пользователя совпадает с правильным ответом`, () => {

    assert.equal(isCorrectAnswer([`photo`, `picture`], {
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
          answer: `picture`
        }
      ])}), true);

    assert.equal(isCorrectAnswer([`photo`], {
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
      ])}), true);

    assert.equal(isCorrectAnswer(1, {
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
      ])}), true);

  });

  it(`Функция возвращает false, если ответ пользователя не совпадает с правильным ответом`, () => {

    assert.equal(isCorrectAnswer([`photo`, `photo`], {
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
          answer: `picture`
        }
      ])}), false);

    assert.equal(isCorrectAnswer([`picture`, `picture`], {
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
          answer: `picture`
        }
      ])}), false);

    assert.equal(isCorrectAnswer([`picture`], {
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
      ])}), false);

    assert.equal(isCorrectAnswer(0, {
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
      ])}), false);

  });

  it(`Функция выкидывает ошибку, если ответ пользователя не передан или передано некорректное значение`, () => {

    assert.throws(() => isCorrectAnswer(undefined, {
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
      ])}), Error);

    assert.throws(() => isCorrectAnswer(null, {
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
      ])}), Error);

    assert.throws(() => isCorrectAnswer(`picture`, {
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
      ])}), Error);

    assert.throws(() => isCorrectAnswer(1, { // передано число там, где должен быть массив
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
      ])}), Error);

    assert.throws(() => isCorrectAnswer([`picture`, `photo`], { // передан массив там, где должно быть число
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
      ])}), Error);

  });

  it(`Функция выкидывает ошибку, если не передан вопрос, или передано некорректное значение`, () => {
    assert.throws(() => isCorrectAnswer([`photo`, `picture`], undefined), Error);
    assert.throws(() => isCorrectAnswer([`photo`, `picture`], null), Error);
    assert.throws(() => isCorrectAnswer([`photo`, `picture`], 1), Error);
    assert.throws(() => isCorrectAnswer([`photo`, `picture`], `photo`), Error);
  });

});
