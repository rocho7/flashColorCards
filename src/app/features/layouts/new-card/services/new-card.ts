import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardsApiServices } from '../../../../core/services/cards-api-services/cards-api-services';
import { ICard } from '../../card/interface/card.interface';

@Injectable({
  providedIn: 'root',
})
export class NewCardService {
  cardSelected$ = signal({
    id: 0,
    disparador$: new BehaviorSubject(null),
    editorTitle: null,
    editorMeaning: null,
    delay: 0,
    title: '',
    meaning: '',
  });

  cardsApiServices = inject(CardsApiServices);

  postCard(card: ICard): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cardsApiServices
        .requestCard(card)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
