import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { Timer } from '../timer';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  private timeout = 0;

  constructor(private readonly timer: Timer, private readonly button: HTMLElement) {
    super('div', ['main__cards']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
    window.clearTimeout(this.timeout);
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    this.timeout = window.setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.timer.reset();
      this.button.style.display = 'inline-block';
    }, 30000);
    this.element.style.gridTemplateColumns = `repeat(${Math.sqrt(this.cards.length)}, 1fr)`;
  }
}
