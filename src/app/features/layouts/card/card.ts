import { Component, input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { ICard } from './interface/card.interface';

@Component({
  selector: 'app-card',
  imports: [CardModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  card = input.required<ICard>();
}
