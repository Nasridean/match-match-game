import { About } from './components/about';
import { Database } from './components/database';
import { GameSettings } from './components/game-settings';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { ImageCategoryModel } from './models/image-category-models';

export class App {
  private readonly game: Game;

  private readonly header: Header;

  private readonly mainElement: HTMLElement;

  private readonly about: About;

  private readonly gameSettings: GameSettings;

  database: Database;

  constructor(private readonly rootElement: HTMLElement) {
    this.database = new Database();
    //this.database.putDataToDatabase('wazzup!', '1');
    //this.database.putDataToDatabase('hiii!', '2');
    //this.database.putDataToDatabase('hello', '2');
    this.header = new Header();
    this.mainElement = document.createElement('main');
    this.mainElement.classList.add('main');
    this.game = new Game();
    this.about = new About();
    this.gameSettings = new GameSettings();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.mainElement);
    this.renderMainContent();
    window.addEventListener('locationchange', () => this.renderMainContent());
  }

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
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    const images = categories[0].images.map((name) => `${categories[0].category}/${name}`);
    this.game.newGame(images);
  }
}
