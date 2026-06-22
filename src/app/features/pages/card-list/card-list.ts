import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ICard } from '../../layouts/card/interfaces/card.interface';
import { CardComponent } from '../../layouts/card/card';
import { HeaderService } from '../../layouts/header/services/header';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardListComponent implements OnInit {
  headerService = inject(HeaderService);

  cards = signal<Array<ICard>>([]);
  cardList = computed<Array<ICard>>(() => {
    const search = this.headerService.search$();

    if (!search) {
      return this.cards();
    }

    const cardListFiltered = this.cards().filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );

    return cardListFiltered;
  });

  ngOnInit(): void {
    this.cards.set([
      {
        id: 0,
        title: 'Nueva card',
        total: 4,
        remain: 2,
        new: 4,
        learning: 4,
        review: 4,
        color: '#cf25cf',
      },
      {
        id: 1,
        title: 'Nueva card 1',
        total: 10,
        remain: 2,
        new: 4,
        learning: 4,
        review: 4,
        color: '#5cf',
      },
      {
        id: 2,
        title: 'Hello',
        total: 3,
        remain: 2,
        new: 2,
        learning: 2,
        review: 3,
        color: '#5cfbbb',
      },
    ]);
  }
}
