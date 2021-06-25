import { User } from '../models/user';
import { BaseComponent } from './base-component';
import { Score } from './score';

export class Scores extends BaseComponent {
  constructor(private readonly users: User[]) {
    super('div', ['main__container']);
    this.element.innerHTML = `
      <h2 class="main__title">Best Players</h2>
      <div class="main__players"></div>
    `;
  }

  updateScore = () => {
    const users = [...this.users];
    (<HTMLDivElement> this.element.lastElementChild).innerHTML = '';
    const scores = users.sort((a, b) => b.score - a.score).map((user) => new Score(user));
    scores.forEach((score) => this.element.lastElementChild?.append(score.element));
    console.log(users, scores, this.users);
  };
}
