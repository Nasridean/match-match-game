import { BaseComponent } from './base-component';

export class Timer extends BaseComponent {
  public minutes = 0;

  public seconds = 0;

  private interval = 0;

  constructor() {
    super('div', ['main__time']);
    this.start();
  }

  render() {
    this.element.innerHTML = `<p class="main__time-value">
    ${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}
    </p>`;
  }

  start() {
    this.interval = window.setInterval(() => {
      if (this.seconds === 59) {
        this.seconds = 0;
        this.minutes = ++this.minutes;
      }
      this.seconds = ++this.seconds;
      this.render();
    }, 1000);
  }

  stop() {
    window.clearInterval(this.interval);
  }

  reset() {
    this.minutes = 0;
    this.seconds = 0;
  }
}
