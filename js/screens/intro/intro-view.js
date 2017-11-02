import AbstractView from '../../abstract-view';

export default class IntroView extends AbstractView {

  get template() {
    return `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;
  }

  loadImages(questions) {
    const images = new Set();
    for (const question of questions) {
      const items = [...question.content];
      for (const item of items) {
        images.add(item.image.url);
      }
    }

    let counter = 0;
    const onLoad = () => {
      counter++;
      if (counter === images.size) {
        this.next();
      }
    };

    for (const image of [...images]) {
      const img = document.createElement(`img`);
      img.onload = img.onerror = onLoad;
      img.src = image;
    }
  }

  next() {}

}
