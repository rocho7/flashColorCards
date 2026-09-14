import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProgressbarService } from '../../../features/layouts/progressbar/services/progressbar';
import { ICard } from '../../../features/layouts/card/interface/card.interface';
import { finalize } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardsApiServices {
  private http = inject(HttpClient);
  private progressbarService = inject(ProgressbarService);

  private url: string = environment.apiUrl;

  requestCard(card: ICard): Promise<any> {
    const cardDto = {
      id: card.id ? card.id : 0,
      title: card.title,
      review: card.review,
      forgotten: card.forgotten,
      date: '',
      answer: card.answer,
      delay: card.delay,
      color: card.color,
      set: { id: Number(card.idSet) },
      idSet: Number(card.idSet),
    };

    if (card.delay) {
      return this.updateCard(cardDto);
    }
    return this.createCard(cardDto);
  }

  private createCard(cardDto: ICard): Promise<any> {
    this.progressbarService.start();

    return new Promise((resolve, reject) => {
      this.http
        .post<ICard>(`${this.url}/card`, cardDto)
        .pipe(finalize(() => this.progressbarService.stop()))
        .subscribe(
          (event: ICard) => {
            console.log(
              '%cCREATE ',
              'color: white; background-color: #007acc;',
              event,
            );
            resolve(event);
          },
          (err) => reject(err),
        );
    });
  }

  private updateCard(cardDto: ICard): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ICard>(`${this.url}/card/${cardDto.id}`, cardDto)
        // .pipe(finalize(() => this.progressbarService.stop()))
        .subscribe(
          (event: ICard) => {
            console.log(
              '%cUPDATE ',
              'color: white; background-color: #007acc;',
              event,
            );
            resolve(event);
          },
          (err) => reject(err),
        );
    });
  }
}
