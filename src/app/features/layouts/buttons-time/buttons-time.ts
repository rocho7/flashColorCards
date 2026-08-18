import { JsonPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicTimeService } from './services/dynamic-time-service';

@Component({
  selector: 'app-buttons-time',
  imports: [ButtonModule, JsonPipe],
  templateUrl: './buttons-time.html',
  styleUrl: './buttons-time.scss',
})
export class ButtonsTimeComponent implements OnInit, AfterViewInit {
  actionButton = model<any>(0);
  item = input<any>(null);

  buttonValues = computed(() => {
    // this.isClickedEasyButton = false;
    // this.isClickedMediumButton = false;
    // this.isClickedDifficultButton = false;
    const nexTime = this.next() > 0 ? this.next() : 0;
    if (nexTime === 0) {
      this.isClickedEasyButton = false;
      this.isClickedMediumButton = false;
      this.isClickedDifficultButton = false;
    }
    return {
      label1: this.timeEasy()[nexTime],
      label2: this.timeMedium()[nexTime],
      label3: this.timeDifficult()[nexTime],
    };
  });
  total = 0;
  next: WritableSignal<number> = signal(0);
  // time: WritableSignal<number> = signal(60000);
  timeDynamic: Signal<Array<{ label: string; value: number }>> = computed(() =>
    this.dynamicTimeService.setButtonsTime(),
  );
  timeEasy: Signal<Array<{ label: string; value: number }>> = signal([
    {
      label: '1 min.',
      value: 60000,
    },
    {
      label: '5 min.',
      value: 300000,
    },
    {
      label: '10 min.',
      value: 600000,
    },
    {
      label: '20 min.',
      value: 1200000,
    },
    {
      label: '40 min.',
      value: 2400000,
    },
    {
      label: '60 min.',
      value: 3600000,
    },
  ]);
  timeMedium: Signal<Array<{ label: string; value: number }>> = signal([
    {
      label: '5 min.',
      value: 50000,
    },
    {
      label: '10 min.',
      value: 100000,
    },
    {
      label: '20 min.',
      value: 200000,
    },
    {
      label: '40 min.',
      value: 400000,
    },
    {
      label: '60 min.',
      value: 600000,
    },
    {
      label: '2 hours.',
      value: 1200000,
    },
  ]);

  timeDifficult: Signal<Array<{ label: string; value: number }>> = signal([
    {
      label: '10 min.',
      value: 100000,
    },
    {
      label: '20 min.',
      value: 200000,
    },
    {
      label: '40 min.',
      value: 400000,
    },
    {
      label: '60 min.',
      value: 600000,
    },
    {
      label: '2 hours.',
      value: 1200000,
    },
    {
      label: '4 hours.',
      value: 240000,
    },
  ]);
  isClickedEasyButton: boolean = false;
  isClickedMediumButton: boolean = false;
  isClickedDifficultButton: boolean = false;

  dynamicTimeService = inject(DynamicTimeService);

  constructor() {
    effect(() => {
      // console.log(
      //   '%citem del PADRE ',
      //   'color: white; background-color: #007acc;',
      //   this.item(),
      // );
    });
  }

  ngOnInit(): void {
    //TODO Se debe recibir la petición de las traducciones y ver si ya se ha estudiado( significa que ya se le ha asignado tiempo a cada traducciión)
    //TODO Sino, se inicializa el tiempo de los botones a uno por defecto.
    //TODO cada traducción debe tener su tiempo( 5 min, 10 min, 40 min)
    //Si es la primera vez que se accede, es decir no hay ya tiempo asignado en las traducciones
    // 60 000 = 1 min
    //6000 * 5 easy
    //6000 * 10 medium
    //6000 * 20 difficult
  }

  ngAfterViewInit(): void {}

  onClickEasyButton(time: number): void {
    // this.dynamicTimeService.time.set(time);
    // this.total = this.total + 1;
    console.log(
      '%cvalor time ',
      'background: purple; color: white; display: block;',
      this.dynamicTimeService.time(),
    );
    let isClicked = {
      clicked: true,
      time,
    };
    this.actionButton.set(isClicked);
    // this.actionButton.set(time);
    isClicked = {
      clicked: false,
      time,
    };

    // let nextTime = 1;
    // if (this.isClickedEasyButton) {
    //   nextTime = -1;
    // }
    // this.setNext(nextTime);
    // this.isClickedEasyButton = true;
  }

  setNext(nextTime: number): void {
    // let count = 1;
    // if (
    //   this.isClickedEasyButton ||
    //   this.isClickedMediumButton ||
    //   this.isClickedDifficultButton
    // ) {
    //   count = -1;
    // } else {
    //   count = 1;
    // }
    this.next.update((it) => it + nextTime);
  }

  onClickMediumButton(time: number): void {
    this.total = this.total + 1;
    this.actionButton.set(time);
    // this.actionButton.set(this.total);
    let nextTime = 1;
    if (this.isClickedMediumButton) {
      nextTime = -1;
    }
    this.setNext(nextTime);
    // this.isClickedEasyButton = false;
    this.isClickedMediumButton = true;
    // this.isClickedDifficultButton = false;
  }

  onClickDifficultButton(time: number): void {
    this.total = this.total + 1;
    this.actionButton.set(time);
    // this.actionButton.set(this.total);
    let nextTime = 1;
    // if (this.isClickedDifficultButton) {
    //   nextTime = -1;
    // }
    this.setNext(nextTime);
    // this.isClickedEasyButton = false;
    // this.isClickedMediumButton = false;
    this.isClickedDifficultButton = true;
    // this.time().set;
  }
}
