import { About } from './components/about';
import { Database } from './components/database';
import { Form } from './components/form';
import { GameSettings } from './components/game-settings';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ImageCategoryModel } from './models/image-category-models';

export class App {
  private readonly form: Form;

  private readonly header: Header;

  private readonly mainElement: HTMLElement;

  private readonly about: About;

  private readonly gameSettings: GameSettings;

  private readonly database: Database;

  private game: Game;

  private cardType: FormDataEntryValue = 'cars';

  private gameDifficulty: FormDataEntryValue = '8';

  constructor(private readonly rootElement: HTMLElement) {
    this.database = new Database();
    this.database.manageDatabase();
    // this.database.putDataToDatabase('hiii!', '2');
    // this.database.putDataToDatabase('hello', '2');
    this.mainElement = document.createElement('main');
    this.mainElement.classList.add('main');
    this.form = new Form();
    this.header = new Header(this.form.openForm);
    this.game = new Game();
    this.about = new About();
    this.gameSettings = new GameSettings();
    this.gameSettings.element.onsubmit = this.saveSettings; // console.log(new FormData((<HTMLFormElement> this.gameSettings.element)).get('type'))
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.mainElement);
    this.renderMainContent();
    window.addEventListener('locationchange', () => this.renderMainContent());
  }

  saveSettings = (e: Event) => {
    e.preventDefault();
    const form = new FormData(<HTMLFormElement> this.gameSettings.element);
    this.cardType = (<FormDataEntryValue>form.get('type'));
    this.gameDifficulty = (<FormDataEntryValue>form.get('difficulty'));
    this.game = new Game();
    this.start();
    // window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('locationchange'));
  };

  renderMainContent() {
    this.mainElement.innerHTML = '';
    switch (window.location.pathname) {
      case '/about':
        this.mainElement.appendChild(this.about.element);
        window.history.replaceState({}, '', '/');
        break;
      case '/game-settings':
        this.mainElement.appendChild(this.gameSettings.element);
        window.history.replaceState({}, '', '/');
        break;
      default:
        this.mainElement.appendChild(this.game.element);
        window.history.replaceState({}, '', '/');
        break;
    }
    this.mainElement.appendChild(this.form.element);
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    const images = categories[0].images.map((name) => `${this.cardType}/${name}`);
    this.game.newGame(images);
  }
}
