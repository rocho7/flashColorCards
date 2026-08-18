import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../constants/global.constant';
import { ProgressbarService } from '../../../features/layouts/progressbar/services/progressbar';
import { ISet } from '../../../features/layouts/set/interfaces/set.interface';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  http = inject(HttpClient);
  progressbarService = inject(ProgressbarService);
  authenticationService = inject(AuthenticationService);

  url: string = API_URL;

  getSetsList(): Promise<any> {
    // this.progressbarService.progressbarProcess.set(1);
    this.progressbarService.start();

    return new Promise((resolve, reject) => {
      this.http
        .get<ISet[]>(`${this.url}/set`, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe(
          (event: HttpEvent<ISet[]>) => {
            console.log(
              '%csetList ',
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
    event: HttpEvent<ISet[]> | HttpEvent<ISet>,
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

  getSet(idSet: number): Promise<any> {
    // this.progressbarService.progressbarProcess.set(1);
    this.progressbarService.start();

    return new Promise((resolve, reject) => {
      this.http
        .get<ISet>(`${this.url}/set/${idSet}`, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe(
          (event: HttpEvent<ISet>) => {
            console.log(
              '%cset ',
              'color: white; background-color: #007acc;',
              event,
            );
            this.downloadProgressbarRequest(event, resolve, reject);
          },
          (err) => reject(err),
        );
    });
  }

  createSet(set: ISet): Promise<any> {
    const idUser = this.authenticationService.userInfo().id;
    const setDto = {
      title: set.title,
      total: set.total,
      remain: set.remain,
      idUser,
      color: set.color,
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.url}/set`, setDto, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
