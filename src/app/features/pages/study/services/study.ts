import { Injectable, signal, WritableSignal } from '@angular/core';
import { ISet } from '../../../layouts/set/interfaces/set.interface';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  cardList: WritableSignal<ISet> = signal({
    id: 0,
    total: 0,
    title: '',
    remain: 0,
    color: '',
    cards: [],
    new: 0,
    learning: 0,
    review: 0,
  });
}
