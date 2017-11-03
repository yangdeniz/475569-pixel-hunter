import assert from 'assert';
import adapt from './data-adapter';

const input = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        type: `photo`
      },
      {
        image: {
          url: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        type: `painting`
      }
    ]
  },
  {
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://placehold.it/705x455`,
          width: 705,
          height: 455
        },
        type: `photo`
      }
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `painting`
      },
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `photo`
      }
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите фото среди изображений`,
    answers: [
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `painting`
      },
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `painting`
      },
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `photo`
      }
    ]
  }
];

const output = [
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: new Set([
      {
        number: 1,
        image: {
          url: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        answer: `photo`
      },
      {
        number: 2,
        image: {
          url: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        answer: `paint`
      }
    ])
  },
  {
    task: `Угадай, фото или рисунок?`,
    content: new Set([
      {
        number: 1,
        image: {
          url: `http://placehold.it/705x455`,
          width: 705,
          height: 455
        },
        answer: `photo`
      }
    ])
  },
  {
    task: `Найдите рисунок среди изображений`,
    content: new Set([
      {
        number: 1,
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: 2,
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: true
      },
      {
        number: 3,
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      }
    ])
  },
  {
    task: `Найдите фото среди изображений`,
    content: new Set([
      {
        number: 1,
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: 2,
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: 3,
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: true
      }
    ])
  }
];

describe(`Data adapting function`, () => {

  it(`Функция преобразует формат входных данных в формат, используемый в модулях`, () => {
    assert.deepEqual(adapt(input), output);
  });

  it(`Функция выкидывает ошибку, если не переданы некорректные значения`, () => {
    assert.throws(() => adapt(), Error);
    assert.throws(() => adapt([{
      type: `tinder-like`,
      question: null,
      answers: [{
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `photo`
      }]
    }]), Error);
    assert.throws(() => adapt([{
      type: `tinder-like`,
      question: `Угадай, фото или рисунок?`,
      answers: []
    }]), Error);
  });

});
