import { About } from "./components/about";
import { GameSettings } from "./components/game-settings";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { ImageCategoryModel } from "./models/image-category-models";

export class App {
  private readonly game: Game;
  private readonly header: Header;
  private readonly mainElement: HTMLElement;
  private readonly about: About;
  private readonly gameSettings: GameSettings;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.mainElement = document.createElement('main');
    this.mainElement.classList.add('main');
    this.game = new Game();
    this.about = new About();
    this.gameSettings = new GameSettings()
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.mainElement);
    this.renderMainContent();
    window.addEventListener('locationchange', () => this.renderMainContent());
  }
  renderMainContent() {
    this.mainElement.innerHTML = '';
    switch (window.location.pathname) {
      case '/about':
        this.mainElement.appendChild(this.about.element)
        break;
      case '/game-settings':
        this.mainElement.appendChild(this.gameSettings.element);
        break;
      default:
        this.mainElement.appendChild(this.game.element);
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