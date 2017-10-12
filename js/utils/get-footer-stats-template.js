import initialState from '../data/initial-state';

export default (state) => `<div class="stats">
<ul class="stats">
  ${state.answersStats.map((answer) => 
    `<li class="stats__result stats__result--${answer}"></li>`)}
</ul>
</div>`;
