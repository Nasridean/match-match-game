import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { ImageCategoryModel } from "./models/image-category-models";

export class App {
  private readonly game: Game;
  private readonly header: Header;
  private readonly main: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.main = document.createElement('main');
    this.main.classList.add('main');
    this.game = new Game();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main);
    this.main.appendChild(this.game.element);
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    const images = categories[0].images.map((name) => `${categories[0].category}/${name}`);
    this.game.newGame(images);
  }
}