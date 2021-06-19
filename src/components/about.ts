import { BaseComponent } from "./base-component";

export class About extends BaseComponent {
  constructor() {
    super('div', ['main__container']);
    this.element.innerHTML = `
      <h2 class="main__title">How to play?</h2>
      <div class="main__block main__block--1">
        <div class="main__text main__text--register">Register new player in game</div>
        <img src="image 1.jpg" alt="add user form" class="main__img main__img--add-user">
      </div>
      <div class="main__block main__block--2">
        <div class="main__text main__text--configure">Configure your game settings</div>
        <img src="image 2.png" alt="settings button" class="main__img main__img--settings">
      </div>
      <div class="main__block main__block--3">
        <div class="main__text main__text--start">
          Start your new game! Remember card positions and
          match it before times up.
        </div>
        <img src="image 3.png" alt="cards" class="main__img main__img--cards">
      </div>
    `
  }
}