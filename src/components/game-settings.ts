import { BaseComponent } from "./base-component";

export class GameSettings extends BaseComponent {
  constructor() {
    super('div', ['main__container', 'main__container--settings']);
    this.element.innerHTML = `
      <div class="main__select-block">
        <h2 class="main__title">Game cards</h2>
        <select name="type" id="" class="main__select">
          <option value="" selected>select game cards type</option>
        </select>
      </div>
      <div class="main__select-block">
        <h2 class="main__title">Difficulty</h2>
        <select name="difficulty" id="" class="main__select">
          <option value="" selected>select game type</option>
        </select>
      </div>
    `
  }
}