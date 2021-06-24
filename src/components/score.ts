import { User } from '../models/user';
import { BaseComponent } from './base-component';

export class Score extends BaseComponent {
  constructor(private readonly user: User) {
    super('div', ['main__player']);
    this.element.innerHTML = `
      <div class="main__credentials">
        <img src="${user.avatar}" alt="avatar" class="main__avatar">
        <p class="main__text-credentials">
          <span class="main__name">${user.firstName}</span><br>
          <span class="main__email">${user.lastName}</span>
        </p>
      </div>
      <p class="main__score">Score: <span class="main__score-value">${user.score}</span></p>
    `;
  }
}
