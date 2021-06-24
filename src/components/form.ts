import { User } from '../models/user';
import { BaseComponent } from './base-component';

export class Form extends BaseComponent {
  private readonly reader: FileReader = new FileReader();

  private imgURL: string = '';

  constructor(private users: User[], private readonly start: () => void) {
    super('div', ['main__container', 'main__container--form']);
    this.element.innerHTML = `
    <form class="main__form">
      <legend class="main__title">Register new Player</legend>
      <input name="firstName" class="main__form-input" type="text" name="firstName" placeholder="First name" pattern="^[^0-9 ~ ! @ # $ % * () _ — + = | : ;  < > , . ? / ^ &#34 &#39 &#96]*$" required>
      <input id="image-input" name="image-input" class="main__form-image-input" type="file" accept="image/*"<br>
      <label class="main__form-image-input-label"for="image-input"></label>
      <input name="lastName" class="main__form-input" type="text" name="lastName" placeholder="Last name" pattern="^[^0-9 ~ ! @ # $ % * () _ — + = | : ;  < > , . ? / ^ &#34 &#39 &#96]*$" required><br>
      <input name="email" class="main__form-input" type="email" name="email" placeholder="Email" required>
      <input class="main__add-user-button" type="submit" name="submit" value="Add user">
      <button class="main__cancel-button">Cancel</button>
    </form>
    `;
    this.element.firstElementChild?.lastElementChild?.addEventListener('click', this.closeForm);
    this.element.firstElementChild?.addEventListener('submit', this.addUser);
    this.element.firstElementChild?.children[2].addEventListener('input', this.uploadPicture)
  }

  uploadPicture = (e: Event): void => {
    const form: FormData = new FormData((<HTMLFormElement> this.element.firstElementChild));
    this.reader.onload = (e: ProgressEvent<FileReader>): void => {
      this.imgURL = (<string>e.target?.result);
      const imgInputLabel: HTMLLabelElement = (<HTMLLabelElement> this.element.firstElementChild?.children[3]);
      imgInputLabel.style.backgroundImage = `url(${e.target?.result})`;
    };
    this.reader.readAsDataURL((<Blob>form.get('image-input')));

  };

  addUser = (e: Event): void => {
    e.preventDefault();
    this.start();
    const formElement = (<HTMLFormElement> this.element.firstElementChild);
    const form: FormData = new FormData(formElement);
    const reader: FileReader = new FileReader();
    const user: User = {
        id: this.users.length,
        firstName: (<string>form.get('firstName')),
        lastName: (<string>form.get('lastName')),
        email: (<string>form.get('email')),
        score: 0,
        avatar: this.imgURL || null
      };
      if (this.reader.readyState === 1) {
        const push = (e: Event): void => {
          this.users.push(user);
          formElement.reset();
          window.dispatchEvent(new Event('locationchange'));
          e.target?.removeEventListener('load', push)
        }
        reader.addEventListener('load', push);
        return alert('wait until image is loaded');
      }
      this.users.push(user);
      formElement.reset();
      this.closeForm(e);
      window.dispatchEvent(new Event('locationchange'));
      window.dispatchEvent(new Event('usersupdate'));
      console.log(this.users);
  };

  closeForm = (e: Event): void => {
    e.preventDefault();
    this.element.style.display = 'none';
  };

  openForm = (e: Event): void => {
    e.preventDefault();
    this.element.style.display = 'block';
  };
}
