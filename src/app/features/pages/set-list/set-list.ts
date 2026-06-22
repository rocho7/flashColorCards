import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../layouts/header/services/header';
import { ISet } from '../../layouts/set/interfaces/set.interface';
import { SetComponent } from '../../layouts/set/set';
import { FooterComponent } from '../../layouts/footer/footer';
import { HeaderComponent } from '../../layouts/header/header';

@Component({
  selector: 'app-set-list',
  imports: [SetComponent, HeaderComponent, FooterComponent],
  templateUrl: './set-list.html',
})
export class SetListComponent implements OnInit {
  headerService = inject(HeaderService);

  sets = signal<Array<ISet>>([]);
  setList = computed<Array<ISet>>(() => {
    const search = this.headerService.search$();

    if (!search) {
      return this.sets();
    }

    const setListFiltered = this.sets().filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );

    return setListFiltered;
  });

  ngOnInit(): void {
    this.sets.set([
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
