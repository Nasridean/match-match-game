import { BaseComponent } from "../base-component";

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header'])
    this.element.innerHTML = `
    <div class="header__left-side">
      <div class="header__logo">
        <p>match</p>
        <p>match</p>
      </div>
      <div class="header__links">
        <div class="header__link">
          <a href="../index.html" class="header__link-button header__link-button--about">
            <i class="header__icon--about header__icon">?</i>
            About game
          </a>
        </div>
        <div class="header__link">
          <a href="#" class="header__link-button header__link-button--score active">
            <i class="header__icon--score header__icon"></i>
            Best score
          </a>
        </div>
        <div class="header__link">
          <a href="settings.html" class="header__link-button header__link-button--game-settings">
            <i class="header__icon--game-settings header__icon"></i>
            Game Settings
          </a>
        </div>
      </div>
    </div>
    
    <button class="header__button">Register new player</button>
    `
  }
}