import { User } from '../../models/user';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { CongratsModal } from '../congrats-modal';
import { Timer } from '../timer';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  score = 0;

  matchCount = 0;

  private images: string[] = [];

  private activeCard?: Card;

  private isAnimation = false;

  private isPaused = false;

  timer: Timer;

  congratsModal: CongratsModal;

  private readonly pauseOrResumeButton: HTMLElement;

  constructor(private users: User[]) {
    super('div', ['main__container', 'main__container--game']);
    this.element.innerHTML = '<button class="main__pause-resume-button" style="display: none">pause game</button>';
    this.pauseOrResumeButton = (<HTMLElement> this.element.firstElementChild);
    this.timer = new Timer();
    this.cardsField = new CardsField(this.timer, this.pauseOrResumeButton);
    this.congratsModal = new CongratsModal();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
    this.element.appendChild(this.congratsModal.element);
    this.element.firstElementChild?.addEventListener('click', this.pauseOrResumeGame);
  }

  newGame(images: string[]) {
    this.score = 0;
    this.matchCount = 0;
    this.images = images;
    this.timer.reset();
    this.timer.start();
    this.cardsField.clear();
    this.pauseOrResumeButton.style.display = 'none';
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach(
      (card) => card.element.addEventListener('click', () => this.cardHandler(card)),
    );
    this.cardsField.addCards(cards);
  }

  pauseOrResumeGame = (e: Event) => {
    if (this.isPaused) {
      (<HTMLElement>e.target).textContent = 'pause game';
      this.isPaused = false;
      this.timer.start();
      return;
    }
    (<HTMLElement>e.target).textContent = 'resume game';
    this.isPaused = true;
    this.timer.stop();
  };

  private cardHandler(card: Card) {
    if (this.isAnimation || this.isPaused) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.score--;
      this.activeCard.markAsIncorrect();
      card.markAsIncorrect();
      setTimeout(() => {
        this.activeCard?.flipToBack();
        this.activeCard?.unmark();
        card.flipToBack();
        card.unmark();
        this.activeCard = undefined;
        this.isAnimation = false;
      }, 1000);
      return;
    }
    this.score++;
    this.matchCount++;
    this.activeCard.markAsCorrect();
    card.markAsCorrect();
    this.activeCard = undefined;
    this.isAnimation = false;
    if (this.matchCount === this.images.length) {
      this.timer.stop();
      this.score = (this.score * 100) - (this.timer.minutes * 60 + this.timer.seconds) * 10;
      this.score = this.score < 0 ? 0 : this.score;
      this.users[this.users.length - 1].score = this.score;
      window.dispatchEvent(new Event('usersupdate'));
      this.congratsModal.open([this.score, this.timer.minutes, this.timer.seconds]);
      console.log(this.users)
    }
  }
}
