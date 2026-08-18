import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicTimeService {
  time: WritableSignal<number> = signal(60000);

  formatButtonTime(time: number) {
    const seconds = Math.floor(time / 1000);

    const month = Math.floor(seconds / (30 * 24 * 60 * 60));
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400) / 3600;
    const minutes = Math.floor(seconds % 3600) / 60;

    const secondsR = seconds % 60;
    let buttonLabel = '';
    if (Math.round(hours) === 0) {
      buttonLabel = `${minutes} min.`;
    } else if (Math.round(hours) !== 0 && days === 0) {
      buttonLabel = `${Math.round(hours)} hours`;
    } else if (Math.round(days) !== 0 && month === 0) {
      buttonLabel = `${Math.round(days)} days`;
    } else if (month !== 0) {
      buttonLabel = `${Math.round(month)} months`;
    }

    return {
      label: buttonLabel,
      value: time,
    };
  }

  hasDecimals(formattedTime: number): boolean {
    return Number.isInteger(formattedTime);
  }

  setButtonsTime(): Array<{ label: string; value: number }> {
    const time = this.time() ? this.time() : 60000;
    const easyButton = this.formatButtonTime(time * 2);
    const mediumButton = this.formatButtonTime(time * 5);
    const difficultButton = this.formatButtonTime(time * 10);
    console.log(
      '%ceasyButton ',
      'background: green; color: white; display: block;',
      easyButton,
    );
    return [easyButton, mediumButton, difficultButton];
  }
}
