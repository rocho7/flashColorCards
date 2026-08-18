import { Injectable, signal, WritableSignal } from '@angular/core';
import { ICard } from '../../../layouts/card/interface/card.interface';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  cardList: WritableSignal<Array<ICard>> = signal([]);
}
