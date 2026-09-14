import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressbarComponent } from './features/layouts/progressbar/progressbar';
import { ProgressbarService } from './features/layouts/progressbar/services/progressbar';
import { DialogMessageComponent } from './features/layouts/dialog/dialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ButtonModule,
    ProgressbarComponent,
    DialogMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flashColorCards';

  progressbarService = inject(ProgressbarService);
}
