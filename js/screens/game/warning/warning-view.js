import AbstractView from '../../../abstract-view';

export default class WarningView extends AbstractView {

  get template() {
    return `<div class="overlay" style="position: fixed; width: 100%; height: 100%; 
    left: 0; top: 0; background-color: rgba(0, 0, 0, 0.5)">
      <div class="warning" style="position: absolute; width: 500px; height: 200px; 
      left: 50%; top: 50%; margin-left: -250px; margin-top: -100px; padding: 20px; background-color: #FFF">
        <p style="text-align: center">Внимание! Текущая игра будет потеряна.<br>
        Вы уверены, что хотите покинуть игру?</p>
        <button class="warning__btn warning__btn-leave" style="width: 150px; height: 30px; 
        margin-left: 60px; text-align: center; font-size: 14px; cursor: pointer">Покинуть игру</button>
        <button class="warning__btn warning__btn-continue" style="width: 150px; height: 30px; 
        margin-left: 60px; text-align: center; font-size: 14px; cursor: pointer">Отмена</button>
      </div>
    </div>`;
  }

  bind() {
    this.element.onclick = (e) => {
      const target = e.target;
      if (!target.classList.contains(`warning__btn`)) {
        return;
      }
      if (target.classList.contains(`warning__btn-leave`)) {
        this.returnBack();
        return;
      }
      if (target.classList.contains(`warning__btn-continue`)) {
        this.continueGame();
      }
    };
  }

  returnBack() {}

  continueGame() {}

}
