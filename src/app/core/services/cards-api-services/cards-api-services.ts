import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProgressbarService } from '../../../features/layouts/progressbar/services/progressbar';
import { API_URL } from '../../constants/global.constant';
import { ICard } from '../../../features/layouts/card/interface/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardsApiServices {
  private http = inject(HttpClient);
  private progressbarService = inject(ProgressbarService);

  private url: string = API_URL;

  requestCard(card: ICard): Promise<any> {
    this.progressbarService.start();

    const cardDto = {
      id: 0,
      title: card.title,
      review: card.review,
      forgotten: card.forgotten,
      date: '',
      answer: card.answer,
      delay: card.delay,
      color: card.color,
      idSet: card.idSet,
    };

    if (card.delay) {
      return this.updateCard(cardDto);
    }
    return this.createCard(cardDto);
  }

  private createCard(cardDto: ICard): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ICard>(`${this.url}/card`, cardDto, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe(
          (event: HttpEvent<ICard>) => {
            console.log(
              '%cCREATE ',
              'color: white; background-color: #007acc;',
              event,
            );
            this.downloadProgressbarRequest(event, resolve, reject);
          },
          (err) => reject(err),
        );
    });
  }

  private updateCard(cardDto: ICard): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ICard>(`${this.url}/card/${cardDto.id}`, cardDto, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe(
          (event: HttpEvent<ICard>) => {
            console.log(
              '%cUPDATE ',
              'color: white; background-color: #007acc;',
              event,
            );
            this.downloadProgressbarRequest(event, resolve, reject);
          },
          (err) => reject(err),
        );
    });
  }

  private downloadProgressbarRequest(
    event: HttpEvent<ICard[]> | HttpEvent<ICard>,
    resolve: (value?: any) => void,
    reject: (reason?: any) => void,
  ): void {
    if (event.type === HttpEventType.DownloadProgress) {
      this.progressbarService.progressbarFake(event);
    } else if (event.type === HttpEventType.Response) {
      if (
        (event.status === 200 &&
          Array.isArray(event.body) &&
          event.body?.length) ||
        event.body
      ) {
        resolve(event.body);
      } else {
        reject(new Error('Respuesta inválida'));
      }
    }
  }
}
