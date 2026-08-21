import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  progressbarProcess: WritableSignal<boolean> = signal(false);
  showMessage = computed(() => this.message());
  private message: WritableSignal<string> = signal('');
  private messages: Array<string> = [
    "This app's deployed on a free hosting server.",
    "It'll take a while.",
    'The server is waking up.',
    'Be patient, please.',
    "It won't take long.",
    "It's almost done.",
  ];
  private subscription = new Subscription();

  start(): void {
    this.progressbarProcess.set(true);
    if (location.pathname.includes('login')) {
      this.showMessages();
    }
  }

  stop(): void {
    this.progressbarProcess.set(false);
    if (location.pathname.includes('login')) {
      this.subscription.unsubscribe();
    }
  }

  showMessages(): void {
    this.subscription.add(
      timer(0, 1500)
        .pipe(map((index) => this.messages[index % this.messages.length]))
        .subscribe((msg) => {
          (console.log(
            '%cmessage ',
            'color: red; display: block; width: 100%;',
            msg,
            location,
          ),
            this.message.set(msg));
        }),
    );
  }
}
