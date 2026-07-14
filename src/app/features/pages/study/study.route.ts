import { Routes } from '@angular/router';
import { StudyComponent } from './study';
import { LearningCardComponent } from '../../layouts/learning-card/learning-card';

export const STUDY_ROUTES: Routes = [
  {
    path: '',
    component: StudyComponent,
  },
  {
    path: 'learning-card',
    component: LearningCardComponent,
  },
];
