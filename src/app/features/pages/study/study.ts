import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SetComponent } from '../../layouts/set/set';
import { TabComponent } from '../../layouts/tab/tab';
import { HeaderStudyComponent } from '../../layouts/header-study/header-study';
import { ActivatedRoute, Router } from '@angular/router';
import { SetsService } from '../../../core/services/sets-api-services/sets.service';
import { ISet } from '../../layouts/set/interfaces/set.interface';
import { concatMap } from 'rxjs';
import { StudyService } from './services/study';

@Component({
  selector: 'app-study',
  imports: [SetComponent, TabComponent, HeaderStudyComponent],
  templateUrl: './study.html',
  styleUrl: './study.scss',
})
export class StudyComponent implements OnInit {
  responseSet = computed(() => this.singleSet());
  singleSet: WritableSignal<ISet> = signal({
    id: 0,
    title: '',
    total: 0,
    remain: 0,
    new: 0,
    learning: 0,
    review: 0,
    color: '',
    cards: [],
  });

  studyService = inject(StudyService);
  route = inject(ActivatedRoute);
  setsService = inject(SetsService);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        concatMap((params: any) => {
          return this.setsService.getSet(Number(params.id));
        }),
      )

      .subscribe((res: ISet) => {
        const response: ISet = {
          ...res,
          cards: res.cards.sort((a, b) => a.id - b.id),
        };

        this.singleSet.set(response);
        this.studyService.cardList.set(res.cards);
      });
    // this.setsService.getSet(1)
    // .then(res => this.singleSet = res)
  }
}
