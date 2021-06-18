import { BaseComponent } from "../base-component";
import { Card } from "../card/card";
import { CardsField } from "../cards-field/cards-field";

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;
  private isAnimation: boolean = false;

  constructor() {
    super('div', ['main__container', 'main__container--game']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    
  }

  newGame(images: string[]) {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - .5);

    cards.forEach(
      (card) => card.element.addEventListener('click', () => this.cardHandler(card))
      );

    this.cardsField.addCards(cards);
  }

  private cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    card.flipToFront();
    if(!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    } else {
      if (this.activeCard.image != card.image) {
        this.activeCard.markAsIncorrect();
        card.markAsIncorrect();
        setTimeout(() => {
          this.activeCard?.flipToBack();
          this.activeCard?.unmark();
          card.flipToBack();
          card.unmark();
          this.activeCard = undefined;
          this.isAnimation = false;
        }, 1000)
        return;
      }
    }
    this.activeCard.markAsCorrect();
    card.markAsCorrect();
    
  }
}