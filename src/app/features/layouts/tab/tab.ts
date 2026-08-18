import { Component, input, signal } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CardComponent } from '../card/card';
import { ICard } from '../card/interface/card.interface';

@Component({
  selector: 'app-tab',
  imports: [TabsModule, CardComponent],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class TabComponent {
  cardList = input.required<Array<ICard>>();
}
