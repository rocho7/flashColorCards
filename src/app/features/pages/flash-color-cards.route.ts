import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { StudyComponent } from './study/study';
import { SetListComponent } from './set-list/set-list';
import { CardListComponent } from './card-list/card-list';

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
        component: StudyComponent,
      },
      {
        path: 'card-list',
        component: CardListComponent,
      },
    ],
  },
];
