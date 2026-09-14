import { computed, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  messageDisplayed = computed<string>(() => this.message());

  private message: WritableSignal<string> = signal('');

  setMessage(message: string): void {
    this.message.set(message);
  }
}
