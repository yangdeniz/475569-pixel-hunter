const questions = [
  {
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
    ])
  },
  {
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
  },
  {
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
  }
];

export default questions;
