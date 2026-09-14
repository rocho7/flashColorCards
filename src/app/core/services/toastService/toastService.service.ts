import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageToast: WritableSignal<ToastMessageOptions | null> =
    signal(null);

  messageToastDisplayed = computed(() => this.messageToast());

  setMessageToast(messageToast: ToastMessageOptions): void {
    this.messageToast.set(messageToast);
  }
}
