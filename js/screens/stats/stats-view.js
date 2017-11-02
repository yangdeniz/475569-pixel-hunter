import AbstractView from '../../abstract-view';

export default class StatsView extends AbstractView {

  constructor(gameIsWon = false) {
    super();
    this.gameIsWon = gameIsWon;
  }

  printStats(stats) {
    const getStatsTemplate = (answersStats) => {
      return `<ul class="stats">${answersStats.map((answer) =>
        `<li class="stats__result stats__result--${answer}"></li>`)}
      </ul>`;
    };

    const getResultTemplate = (state, number) => {
      const result = state.gameResult;
      const gameIsWon = result !== -1;
      let resultsTemplate;
      if (gameIsWon) {
        resultsTemplate = `<tr>
            <td class="result__number">${number + 1}.</td>
            <td colspan="2">${getStatsTemplate(state.answersStats)}</td>
            <td class="result__points">×&nbsp;${result.correct.points}</td>
            <td class="result__total">${result.correct.getResult()}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${result.quick.answers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">×&nbsp;${result.quick.points}</td>
            <td class="result__total">${result.quick.getResult()}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${result.lives.total}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;${result.lives.points}</td>
            <td class="result__total">${result.lives.getResult()}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${result.slow.answers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">×&nbsp;${result.slow.points}</td>
            <td class="result__total">${result.slow.getResult()}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${result.getTotal()}</td>
          </tr>`;
      } else {
        resultsTemplate = `<tr>
            <td class="result__number">${number + 1}.</td>
            <td colspan="2">${getStatsTemplate(state.answersStats)}</td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>`;
      }
      return resultsTemplate;
    };

    const getTemplate = (prevGames) => prevGames.map((game) =>
      `<table class="result__table">${getResultTemplate(game, prevGames.indexOf(game))}</table>`).join(``);

    const statsElement = document.createElement(`div`);
    statsElement.innerHTML = getTemplate(stats);
    const loadingElement = this.element.querySelector(`.loading-template`);
    const parentElement = this.element.querySelector(`.result`);
    parentElement.replaceChild(statsElement, loadingElement);

  }

  get template() {
    const head = this.gameIsWon ? `Победа!` : `Вы проиграли :(`;
    return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    </header>
    <div class="result">
      <h1>${head}</h1>
      <p class="loading-template">Подождите, идет загрузка данных...</p>
    </div>`;
  }

  bind() {
    const back = this.element.querySelector(`.back`);
    back.onclick = () => {
      this.returnBack();
    };
  }

  returnBack() {}

}
