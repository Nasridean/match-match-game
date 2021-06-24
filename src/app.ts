import { About } from './components/about';
import { Database } from './components/database';
import { Form } from './components/form';
import { GameSettings } from './components/game-settings';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Score } from './components/score';
import { Scores } from './components/scores';
import { ImageCategoryModel } from './models/image-category-models';
import { User } from './models/user';

export class App {
  private readonly form: Form;

  private readonly header: Header;

  private readonly mainElement: HTMLElement;

  private readonly about: About;

  private readonly gameSettings: GameSettings;

  private readonly database: Database;

  private game: Game;

  private cardType: FormDataEntryValue = 'cars';

  private gameDifficulty = '8';

  private users: User[] = [];

  private scores: Scores;

  constructor(private readonly rootElement: HTMLElement) {
    this.database = new Database();

    // this.database.putDataToDatabase('hiii!', '2');
    // this.database.putDataToDatabase('hello', '2');
    this.mainElement = document.createElement('main');
    this.mainElement.classList.add('main');
    this.form = new Form(this.users, this.start);
    this.header = new Header(this.form.openForm, this.start, this.users);
    this.game = new Game(this.users);
    this.about = new About();
    this.scores = new Scores(this.users);
    this.gameSettings = new GameSettings();
    this.gameSettings.element.onsubmit = this.saveSettings; // console.log(new FormData((<HTMLFormElement> this.gameSettings.element)).get('type'))
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.mainElement);
    window.addEventListener('locationchange', () => this.renderMainContent());
    window.addEventListener('usersupdate', this.renderAfterUserUpdate);
    if (this.users.length === 0) {
      this.database.getAll()
        .then((value: User[]) => {
          value.forEach((item) => this.users.push(item));
          console.log('hi');
          console.log(this.users);
          this.renderMainContent();
          this.header.adjustButtons();
        });
    }
  }

  private renderAfterUserUpdate = (e: Event): void => {
    console.log(this.users);
    this.header.adjustButtons();
    this.scores.updateScore();
    this.database.putAll(this.users);
  };

  saveSettings = (e: Event) => {
    e.preventDefault();
    const form = new FormData(<HTMLFormElement> this.gameSettings.element);
    this.cardType = (<FormDataEntryValue>form.get('type'));
    this.gameDifficulty = (<string>form.get('difficulty'));
    console.log(this.gameDifficulty);
    this.game = new Game(this.users);
    this.start();
  };

  renderMainContent() {
    this.mainElement.innerHTML = '';
    this.mainElement.appendChild(this.form.element);
    if (this.users.length === 0) return;
    switch (window.location.pathname) {
      case '/about':
        this.mainElement.appendChild(this.about.element);
        window.history.replaceState({}, '', '/');
        break;
      case '/game-settings':
        this.mainElement.appendChild(this.gameSettings.element);
        window.history.replaceState({}, '', '/');
        break;
      case '/score':
        this.mainElement.appendChild(this.scores.element);
        window.history.replaceState({}, '', '/');
        break;
      default:
        this.mainElement.appendChild(this.game.element);
        window.history.replaceState({}, '', '/');
        break;
    }
  }

  start = async () => {
    console.log('fired');
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const images = categories[0].images.slice(0, parseInt(this.gameDifficulty, 10));
    const mappedImages = images.map((name) => `${this.cardType}/${name}`);
    this.game.newGame(mappedImages);
    window.dispatchEvent(new Event('locationchange'));
  };
}
