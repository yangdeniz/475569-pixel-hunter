export default (state, result) => {

  const gameIsWon = !(result === -1);

  let resultsTemplate;

  if (gameIsWon) {
    resultsTemplate = `<h1>Победа!</h1>
    <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">${state.answersStats.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`)}
        </ul>
      </td>
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
    </tr>
    </table>`;
  } else {
    resultsTemplate = `<h1>Вы проиграли :(</h1>
      <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td>
          <ul class="stats">${state.answersStats.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`)}
          </ul>
        </td>
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
};
