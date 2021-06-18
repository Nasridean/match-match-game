import { BaseComponent } from "./base-component";

export class Link extends BaseComponent {
  constructor(private readonly innerText: string[], BEMModificator: string) {
    super('div', ['header__link']);
    this.element.innerHTML = `
    <button class="header__link-button header__link-button--${BEMModificator}">
      <i class="header__icon--${BEMModificator} header__icon">${innerText[1]}</i>
      ${innerText[0]}
    </button>
    `
    //this.element.addEventListener('click', navigate)
  }
}