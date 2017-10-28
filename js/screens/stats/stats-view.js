import AbstractView from '../../abstract-view';

export default class StatsView extends AbstractView {

  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const score = this.state.gameResult;
    const gameIsWon = (score !== -1);
    const gameStats = `<ul class="stats">${this.state.answersStats.map((answer) =>
      `<li class="stats__result stats__result--${answer}"></li>`)}
      </ul>`;
    let resultsTemplate;
    if (gameIsWon) {
      resultsTemplate = `<h1>Победа!</h1>
        <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">${gameStats}</td>
          <td class="result__points">×&nbsp;${score.correct.points}</td>
          <td class="result__total">${score.correct.result}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${score.quick.answers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${score.quick.points}</td>
          <td class="result__total">${score.quick.result}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${score.lives.total}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${score.lives.points}</td>
          <td class="result__total">${score.lives.result}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${score.slow.answers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${score.slow.points}</td>
          <td class="result__total">${score.slow.result}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${score.total}</td>
        </tr>
        </table>`;
    } else {
      resultsTemplate = `<h1>Вы проиграли :(</h1>
        <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">${gameStats}</td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
    }
    return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    </header>
    <div class="result">${resultsTemplate}
    </div>`;
  }

  update(newState) {
    this.state = newState;
  }

  bind() {
    const back = this.element.querySelector(`.back`);
    back.onclick = () => {
      this.returnBack();
    };
  }

  returnBack() {}

}
