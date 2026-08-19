import { Component, computed, inject, OnInit } from '@angular/core';
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
  setList = computed<Array<ISet>>(() => {
    return this.setsService.setList();
  });

  setsService = inject(SetsService);

  ngOnInit(): void {
    this.setsService.getSetsList();
  }
}
