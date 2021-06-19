import { BaseComponent } from "../base-component";
import { Link } from "../link";

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header'])
    this.element.innerHTML = `
    <div class="header__left-side">
      <div class="header__logo">
        <p>match</p>
        <p>match</p>
      </div>
      <nav class="header__links">
        
      </nav>
    </div>
    
    <button class="header__button" id="button">Register new player</button>
    `;
      this.createLinks()
      window.addEventListener('locationchange', () => {
        this.createLinks();
        document.getElementById(window.location.pathname.slice(1))?.classList.add('header__link-button--active');

      })
    }
    createLinks() {
      if (this.element.firstElementChild?.lastElementChild) {
        this.element.firstElementChild.lastElementChild.innerHTML = '';
        this.element.firstElementChild.lastElementChild.appendChild(new Link(['About game', '?'], 'about').element);
        this.element.firstElementChild.lastElementChild.appendChild(new Link(['Best scores', ''], 'score').element);
        this.element.firstElementChild.lastElementChild.appendChild(new Link(['Game settings', ''], 'game-settings').element);
    }
  }
}
