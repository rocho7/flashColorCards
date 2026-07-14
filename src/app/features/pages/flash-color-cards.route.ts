import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { SetListComponent } from './set-list/set-list';
import { CardListComponent } from './card-list/card-list';
import { NewCardComponent } from '../layouts/new-card/new-card';

export const FLASH_COLOR_CARDS: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SetListComponent,
      },
      {
        path: 'study',
        loadChildren: () =>
          import('./study/study.route').then((r) => r.STUDY_ROUTES),
      },
      {
        path: 'card-list',
        component: CardListComponent,
      },
      {
        path: 'new-card',
        component: NewCardComponent,
      },
    ],
  },
];
