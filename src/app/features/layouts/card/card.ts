import { Component, input } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ICard } from './interfaces/card.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [ButtonModule, CardModule, ProgressBarModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  card = input.required<ICard>();
}
