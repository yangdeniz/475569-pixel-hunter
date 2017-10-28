const Points = Object.freeze({
  CORRECT_ANSWER_POINTS: 100,
  QUICK_ANSWER_BONUS: 50,
  SLOW_ANSWER_PENALTY: 50,
  LIVES_BONUS: 50
});

const Time = Object.freeze({
  TIME_TOTAL: 30,
  QUICK_ANSWER_TIME_REMAINED: 20,
  SLOW_ANSWER_TIME_REMAINED: 10
});

const questions = [
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458
        },
        answer: `photo`
      },
      {
        number: `2`,
        image: {
          src: `https://k42.kn3.net/CF42609C8.jpg`,
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
        number: `1`,
        image: {
          src: `http://i.imgur.com/DKR1HtB.jpg`,
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
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: `2`,
        image: {
          src: `https://k32.kn3.net/5C7060EC5.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: true
      },
      {
        number: `3`,
        image: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      }
    ])
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `https://k32.kn3.net/5C7060EC5.jpg`,
          width: 468,
          height: 458
        },
        answer: `paint`
      },
      {
        number: `2`,
        image: {
          src: `https://k42.kn3.net/CF42609C8.jpg`,
          width: 468,
          height: 458
        },
        answer: `paint`
      }
    ])
  },
  {
    task: `Найдите фото среди изображений`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `http://i.imgur.com/DKR1HtB.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: true
      },
      {
        number: `2`,
        image: {
          src: `https://k42.kn3.net/D2F0370D6.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: `3`,
        image: {
          src: `https://k32.kn3.net/5C7060EC5.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      }
    ])
  },
  {
    task: `Угадай, фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 705,
          height: 455
        },
        answer: `photo`
      }
    ])
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `https://k32.kn3.net/5C7060EC5.jpg`,
          width: 468,
          height: 458
        },
        answer: `paint`
      },
      {
        number: `2`,
        image: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458
        },
        answer: `photo`
      }
    ])
  },
  {
    task: `Угадай, фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `https://k42.kn3.net/CF42609C8.jpg`,
          width: 705,
          height: 455
        },
        answer: `paint`
      }
    ])
  },
  {
    task: `Найдите рисунок среди изображений`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `https://k42.kn3.net/D2F0370D6.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: true
      },
      {
        number: `2`,
        image: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      },
      {
        number: `3`,
        image: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 304,
          height: 455
        },
        isCorrectAnswer: false
      }
    ])
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: new Set([
      {
        number: `1`,
        image: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458
        },
        answer: `photo`
      },
      {
        number: `2`,
        image: {
          src: `http://i.imgur.com/DKR1HtB.jpg`,
          width: 468,
          height: 458
        },
        answer: `photo`
      }
    ])
  }
];

const initialState = Object.freeze({
  gameNumber: 0,
  question: questions[0],
  time: Time.TIME_TOTAL,
  livesRemained: 3,
  userAnswers: [],
  answersStats: new Array(10).fill(`unknown`),
  gameResult: -1
});

export {Points, Time, questions, initialState};
