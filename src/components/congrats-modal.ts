import { BaseComponent } from "./base-component";

export class CongratsModal extends BaseComponent {
  constructor() {
    super('div', ['main__container--form']);
    this.element.style.display = 'none';
  }

  open = (data: number[]): void => {
    this.element.style.display = 'block';
    this.element.innerHTML = `
      <div class="main__congrats-modal">
      Congratulations! You successfully found all matches on
      ${data[1].toString().padStart(2, '0')} : ${data[2].toString().padStart(2, '0')} minutes.
      Your score: ${data[0]}
      <button class="main__close-modal-button">ok</button>
      </div>
    `;
    console.log(this.element.firstElementChild?.lastElementChild);
    this.element.firstElementChild?.lastElementChild?.addEventListener('click', this.close )
  }

  close = (): void => {
    window.history.pushState({}, '', '/score')
    this.element.style.display = 'none';
  }
}