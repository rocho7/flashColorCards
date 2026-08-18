import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../layouts/header/services/header';
import { ISet } from '../../layouts/set/interfaces/set.interface';
import { SetComponent } from '../../layouts/set/set';
import { FooterComponent } from '../../layouts/footer/footer';
import { HeaderComponent } from '../../layouts/header/header';
import { SetsService } from '../../../core/services/sets-api-services/sets.service';

@Component({
  selector: 'app-set-list',
  imports: [SetComponent, HeaderComponent, FooterComponent],
  templateUrl: './set-list.html',
})
export class SetListComponent implements OnInit {
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

  headerService = inject(HeaderService);
  setsService = inject(SetsService);

  ngOnInit(): void {
    this.setsService.getSetsList().then((res) => this.sets.set(res));
  }
}
