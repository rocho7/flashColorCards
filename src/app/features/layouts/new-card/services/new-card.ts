import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
