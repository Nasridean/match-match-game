import { BaseComponent } from "../base-component";

export class Card extends BaseComponent {
  isFlipped: boolean = false;

  constructor(readonly image: string) {
    super('div', ['main__flip-card']);


    this.element.innerHTML = `
      <div class="main__flip-card-inner" id="card-inner">
        <img src="${image}" class="main__flip-card-side">
        <img src="image.jpg" class="main__flip-card-side main__flip-card-side--back">
      </div>`;
  }

  flipToBack() {
    this.isFlipped = true;
    this.element.classList.add('main__flip-card--flipped');
  }

  flipToFront() {
    this.isFlipped = false;
    this.element.classList.remove('main__flip-card--flipped');
  }
  
  markAsCorrect() {
    this.element.classList.add('main__flip-card--correct');
  }

  markAsIncorrect() {
    this.element.classList.add('main__flip-card--incorrect');
  }

  unmark() {
    this.element.classList.remove('main__flip-card--incorrect');
  }
}