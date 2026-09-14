import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressbarComponent } from './features/layouts/progressbar/progressbar';
import { ProgressbarService } from './features/layouts/progressbar/services/progressbar';
import { DialogMessageComponent } from './features/layouts/dialog/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ToastService } from './core/services/toastService/toastService.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ButtonModule,
    ToastModule,
    ProgressbarComponent,
    DialogMessageComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flashColorCards';

  progressbarService = inject(ProgressbarService);
  messageService = inject(MessageService);
  toastService = inject(ToastService);

  constructor() {
    effect(() => {
      const message = this.toastService.messageToastDisplayed();
      if (message) {
        this.messageService.add(message);
      }
    });
  }
}
