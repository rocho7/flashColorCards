import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pages/flash-color-cards.route').then(
        (m) => m.FLASH_COLOR_CARDS,
      ),
  },
];
