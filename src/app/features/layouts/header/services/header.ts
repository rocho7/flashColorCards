import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  search$ = signal('');
  // search$ = new Subject<string>();

  // setSearch(search: string): void {
  //   this.search$.next(search);
  // }
  // search$ = new Subject<string>();

  // setSearch(search: string): void {
  //   this.search$.next(search);
  // }
}
