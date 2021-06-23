import { BaseComponent } from './base-component';

export class GameSettings extends BaseComponent {
  public form?: FormData;

  constructor() {
    super('form', ['main__container', 'main__container--settings']);
    this.element.innerHTML = `
      <fieldset class="main__select-block">
        <legend class="main__title">Game cards</legend>
        <select name="type" id="cards-type" class="main__select">
          <option value="cars" selected>select game cards type</option>
          <option value="cars">Cars</option>
          <option value="fruits">Fruits</option>
        </select>
      </fieldset>
      
      <fieldset class="main__select-block">
        <legend class="main__title">Difficulty</legend>
        <select name="difficulty" class="main__select">
          <option value="8" selected>select game type</option>
          <option value="8">4x4</option>
          <option value="18">6x6</option>
          <option value="32">8x8</option>
        </select>
      </fieldset>
      <input type="submit" name="submit" value="Save" class="main__save-button">
    `;
    
    this.element.addEventListener('submit', (e) => {
      this.form = new FormData((<HTMLFormElement> this.element));
      e.preventDefault();
      console.log(this.form.get('type'),this.form.get('difficulty'));
    });
  }
}
