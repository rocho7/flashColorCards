import { Component, signal } from '@angular/core';
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
  cardList = signal<Array<ICard>>([
    {
      id: 0,
      idSet: 0,
      title: 'Suitable, unsuitable',
      review: 5,
      forgotten: 1,
      daysOverdue: 200,
      answer: `apropiado, apto/ inapropiado, inadecuado
      I've got a job interview tomorrow and I'm looking for a suitable outfit.`,
      color: '#5cfbbb',
    },
  ]);
}
