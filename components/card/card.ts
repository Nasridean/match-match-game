import { BaseComponent } from "../base-component";

export class Card extends BaseComponent {
  isFlipped: boolean = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);


    this.element.innerHTML = `<img src="${image}" class="main__card">`;
  }

  flipToBack() {
    this.isFlipped = true;
    this.element.classList.add('flipped');
  }

  flipToFront() {
    this.isFlipped = false;
    this.element.classList.remove('flipped');
  }
}