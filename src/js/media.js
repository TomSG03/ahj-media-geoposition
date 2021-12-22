export default class Media {
  constructor(host) {
    this.host = host;
  }

  init() {
    this.input = this.host.querySelector('.input-line');
    this.input.addEventListener('keydown', this.inputMsg.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  inputMsg(e) {
    if (typeof e !== 'undefined') {
      if (e.key === 'Enter' && e.target.classList.contains('input-line') && e.target.value.trim() !== '') {
        e.preventDefault();
        const HTML = `
         <div class="line-body">
            <div class="circle"></div>
            <div class="body-msg">
              <p class="date">${this.timeStamp()}</p>
              <p class="msg">${e.target.value}</p> 
              <p class="geo">111.111, 111.111</p>
            </div>
          </div>  
        `;
        // div.innerHTML = HTML;
        e.target.closest('.media-box').querySelector('.time-line-body').insertAdjacentHTML('afterbegin', HTML);
        e.target.value = '';
        e.target.closest('.media-box').querySelector('.time-line-body').scrollTop();
      }
    }
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
