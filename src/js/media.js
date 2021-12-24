import Gui from './gui';

export default class Media {
  constructor(host) {
    this.host = host;

    this.input = host.querySelector('.input-line');
    this.postBody = host.querySelector('.time-line-body');

    this.geoOk = this.geoOk.bind(this);
    this.geoError = this.geoError.bind(this);
    this.preShowPost = this.preShowPost.bind(this);

    this.modal = new Gui(host);
  }

  init() {
    this.input = this.host.querySelector('.input-line');
    this.input.addEventListener('keydown', this.inputMsg.bind(this));
  }

  inputMsg(e) {
    if (typeof e !== 'undefined') {
      if (e.key === 'Enter' && e.target.classList.contains('input-line') && e.target.value.trim() !== '') {
        e.preventDefault();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.geoOk, this.geoError);
        }
      }
    }
  }

  showPost(latitude, longitude) {
    const div = document.createElement('div');
    div.className = 'line-body';
    const HTML = `
      <div class="circle"></div>
      <div class="body-msg">
        <p class="date">${this.timeStamp()}</p>
        <p class="msg">${this.input.value}</p> 
        <p class="geo">[${latitude}, ${longitude}]</p>
      </div>    
   `;
    div.innerHTML = HTML;
    this.postBody.insertAdjacentElement('afterbegin', div);
    this.input.value = '';
  }

  geoOk(pos) {
    const { latitude, longitude } = pos.coords;
    this.showPost(latitude.toFixed(5), longitude.toFixed(5));
  }

  geoError() {
    const win = {
      head: 'Что то пошло не так',
      text: `
        К сожалению, нам не удалось определить ваше местоположение, пожалуйста, 
        дайте разрешение на использование геолокации, либо введите координаты вручную`,
      input: {
        head: 'Широта и долгота через запятую',
        value: '',
        error: 'Введите значение в формате 00.00, 00.00',
      },
      button: {
        ok: 'OK',
        cancel: 'Отмена',
      },
    };
    this.modal.winModalDialog(win, this.preShowPost);
  }

  preShowPost() {
    this.modal.closeWinModal();
    this.showPost(this.modal.coords.latitude, this.modal.coords.longitude);
  }

  // eslint-disable-next-line class-methods-use-this
  timeStamp() {
    const time = new Date().toLocaleString([], {
      hour: '2-digit', minute: '2-digit',
    }).replace(/,/, '');
    const date = new Date().toLocaleString([], {
      day: '2-digit', month: '2-digit', year: '2-digit',
    }).replace(/,/, '');

    return `${time} ${date}`;
  }
}
