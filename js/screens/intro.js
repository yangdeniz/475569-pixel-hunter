import getElementFromTemplate from '../utils/get-element-from-template';
import showScreen from '../utils/show-screen';
import greeting from './greeting';

const introTemplate = `<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>`;

const intro = getElementFromTemplate(introTemplate);

intro.querySelector(`.intro__asterisk`).onclick = () => {
  showScreen(greeting);
};

export default intro;
