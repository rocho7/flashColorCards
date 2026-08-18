import { Routes } from '@angular/router';
import { LoginComponent } from './features/pages/login/login.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { SignUpComponent } from './features/pages/sign-up-component/sign-up-component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authenticationGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    // canActivate: [authenticationGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/pages/flash-color-cards.route').then(
        (m) => m.FLASH_COLOR_CARDS,
      ),
    canActivate: [authenticationGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    // canActivate: [authenticationGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
    canActivate: [authenticationGuard],
  },
];
