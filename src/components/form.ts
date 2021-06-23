import { BaseComponent } from './base-component';

export class Form extends BaseComponent {
  constructor() {
    super('div', ['main__container', 'main__container--form']);
    this.element.innerHTML = `
    <form class="main__form">
      <legend class="main__title">Register new Player</legend>
      <input name="firstName" class="main__form-input" type="text" name="firstName" placeholder="First name" pattern="^[^0-9 ~ ! @ # $ % * () _ — + = | : ;  < > , . ? / ^ &#34 &#39 &#96]*$" required>
      <input id="image-input" name="image-input" class="main__form-image-input" type="file" accept="image/*"<br>
      <label class="main__form-image-input-label"for="image-input"></label>
      <input name="lastName" class="main__form-input" type="text" name="lastName" placeholder="Last name" pattern="^[^0-9 ~ ! @ # $ % * () _ — + = | : ;  < > , . ? / ^ &#34 &#39 &#96]*$" required><br>
      <input name="email" class="main__form-input" type="email" name="email" placeholder="Email" required>
      <input class="main__add-user-button type="submit" name="submit" value="Add user">
      <button class="main__cancel-button">Cancel</button>
    </form>
    `;
    this.element.firstElementChild?.lastElementChild?.addEventListener('click', this.closeForm);
  }

  closeForm = (e: Event) => {
    e.preventDefault();
    this.element.style.display = 'none';
  };

  openForm = (e: Event) => {
    e.preventDefault();
    this.element.style.display = 'block';
  };
}
