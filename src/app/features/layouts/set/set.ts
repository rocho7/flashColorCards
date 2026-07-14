import { Component, input } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ISet } from './interfaces/set.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-set',
  imports: [ButtonModule, CardModule, ProgressBarModule, RouterLink],
  templateUrl: './set.html',
})
export class SetComponent {
  set = input.required<ISet>();
  isStudy = input<boolean>(false);
}
