import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { StudyComponent } from './study/study';
import { CardListComponent } from './card-list/card-list';

export const FLASH_COLOR_CARDS: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: CardListComponent,
      },
      {
        path: 'study',
        component: StudyComponent,
      },
    ],
  },
];
