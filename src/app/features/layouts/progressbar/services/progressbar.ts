import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  progressbarProcess: WritableSignal<number> = signal(0);

  interval: number = 0;

  start(): void {
    // this.progressbarFake();
    this.progressbarProcess.set(0);
  }

  stop(): void {
    this.progressbarProcess.set(100);
    clearInterval(this.interval);
  }

  progressbarFake(event: any): void {
    // this.interval = setInterval(
    //   () => this.progressbarProcess.set(Math.floor(Math.random() * 100) + 1),
    //   1000,
    // );
    this.progressbarProcess.set(
      Math.round((100 * event.loaded) / (event.total || event.loaded)),
    );
  }
}
