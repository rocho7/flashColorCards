import { Component, computed, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressbarService } from './services/progressbar';

@Component({
  selector: 'app-progressbar',
  imports: [ProgressBar, ToastModule],
  templateUrl: './progressbar.html',
  styleUrl: './progressbar.scss',
  providers: [MessageService],
})
export class ProgressbarComponent {
  progressbarService = inject(ProgressbarService);

  progressbarValue = computed(() => {
    console.log(
      '%cthis.progressbarService.progressbarProcess() ',
      'color: white; background-color: #007acc;',
      this.progressbarService.progressbarProcess(),
    );
    return this.progressbarService.progressbarProcess();
  });
  progressbarFakeValue: number = 0;
  interval: number = 0;
}
