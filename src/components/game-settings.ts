import { BaseComponent } from "./base-component";

export class GameSettings extends BaseComponent {
  constructor() {
    super('div', ['main__container', 'main__container--settings']);
    this.element.innerHTML = `
      <div class="main__select-block">
        <h2 class="main__title">Game cards</h2>
        <select name="type" id="cards-type" class="main__select">
          <option value="cars" selected>select game cards type</option>
          <option value="cars" selected>Cars</option>
          <option value="fruits" selected>Fruits</option>
        </select>
      </div>
      
      <div class="main__select-block">
        <h2 class="main__title">Difficulty</h2>
        <select name="difficulty" class="main__select">
          <option value="8" selected>select game type</option>
          <option value="8" selected>4x4</option>
          <option value="18" selected>6x6</option>
          <option value="32" selected>8x8</option>
        </select>
      </div>
    `
  }
}