import { BaseComponent } from "./base-component";

export class Scores extends BaseComponent {
  constructor() {
    super('div', ['main__container']);
    this.element.innerHTML = `
      <h2 class="main__title">Best Players</h2>
      <div class="main__players"></div>
    `;
  }

  fetchScoresFromDB() {
    
  }
}