import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { Timer } from '../timer';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  private readonly timer: Timer;

  private readonly button: HTMLElement;

  constructor(timer: Timer, button: HTMLElement) {
    super('div', ['main__cards']);
    this.timer = timer;
    this.button = button;
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.timer.reset();
      this.button.style.display = 'inline-block';
    }, 30000);
    this.element.style.gridTemplateColumns = `repeat(${Math.sqrt(this.cards.length)}, 1fr)`;
  }
}
