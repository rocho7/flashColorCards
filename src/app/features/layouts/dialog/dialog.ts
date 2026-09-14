import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DialogService } from '../../../core/services/dialogService/dialog-service.service';

@Component({
  selector: 'app-dialog-message',
  imports: [Dialog, ButtonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class DialogMessageComponent implements OnInit {
  isDialogMessageVisible = computed(
    () => !!this.dialogService.messageDisplayed(),
  );
  dialogService = inject(DialogService);

  ngOnInit(): void {
    // this.isDialogMessageVisible =
    //   !!this.dialogService.messageDisplayed().length;
  }

  confirmDialog(): void {
    this.dialogService.setMessage('');
    // this.isDialogMessageVisible = false;
  }
}
