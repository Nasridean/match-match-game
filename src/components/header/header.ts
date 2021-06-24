import { User } from '../../models/user';
import { BaseComponent } from '../base-component';
import { Link } from '../link';

export class Header extends BaseComponent {
  private readonly startNewGameButton: HTMLButtonElement;

  private readonly userImageButton: HTMLElement;

  private readonly registerNewPlayerButton: HTMLButtonElement;

  constructor(
    private readonly openForm: (e:Event) => void,
    private readonly start: () => void,
    private readonly users: User[]) {
    super('header', ['header']);
    this.element.innerHTML = `
    <div class="header__left-side">
      <div class="header__logo">
        <p>match</p>
        <p>match</p>
      </div>
      <nav class="header__links">
      </nav>
    </div>
    <button class="header__button">Start new game</button>
    <i class="main__form-image-input-label main__form-image-input-label--header"></i>
    <button class="header__button" id="button">Register new player</button>
    `;
    this.createLinks();
    window.addEventListener('locationchange', () => {
      this.createLinks();
      if (window.location.pathname === '/') return;
      document.getElementById(window.location.pathname.slice(1))?.classList.add('header__link-button--active');
    });
    this.startNewGameButton = (<HTMLButtonElement>this.element.children[1])
    this.userImageButton = (<HTMLElement>this.element.children[2]);
    this.registerNewPlayerButton = (<HTMLButtonElement>this.element.lastElementChild);
    this.startNewGameButton.addEventListener('click', this.start);
    this.userImageButton.addEventListener('click', this.openForm);
    this.registerNewPlayerButton.addEventListener('click', this.openForm);
    this.adjustButtons();
  }

  public adjustButtons = (): void => {
    const noUser = this.users.length === 0;
    this.startNewGameButton.style.display = noUser ? 'none' : 'inline-block';
    this.userImageButton.style.display = noUser ? 'none' : 'inline-block';
    this.registerNewPlayerButton.style.display = noUser ? 'inline-block' : 'none';
    if (!noUser && this.users[this.users.length - 1].avatar)
    this.userImageButton.style.backgroundImage = `url(${this.users[this.users.length - 1].avatar})`;
  }

  private createLinks = (): void => {
    if (this.element.firstElementChild?.lastElementChild) {
      this.element.firstElementChild.lastElementChild.innerHTML = '';
      this.element.firstElementChild.lastElementChild.appendChild(new Link(['About game', '?'], 'about').element);
      this.element.firstElementChild.lastElementChild.appendChild(new Link(['Best scores', ''], 'score').element);
      this.element.firstElementChild.lastElementChild.appendChild(new Link(['Game settings', ''], 'game-settings').element);
    }
  }
}
