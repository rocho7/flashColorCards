import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../constants/global.constant';
import { ProgressbarService } from '../../../features/layouts/progressbar/services/progressbar';
import { ISet } from '../../../features/layouts/set/interfaces/set.interface';
import { AuthenticationService } from '../authentication.service';
import { HeaderService } from '../../../features/layouts/header/services/header';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  sets = signal<Array<ISet>>([]);
  setList = computed<Array<ISet>>(() => {
    const search = this.headerService.search$();

    if (!search) {
      return this.sets();
    }

    const setListFiltered = this.sets().filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );

    return setListFiltered;
  });

  headerService = inject(HeaderService);

  http = inject(HttpClient);
  router = inject(Router);
  progressbarService = inject(ProgressbarService);
  authenticationService = inject(AuthenticationService);

  url: string = API_URL;

  getSetsList(): Promise<any> {
    this.sets.set([]);
    // this.progressbarService.progressbarProcess.set(1);
    if (this.authenticationService.userInfo().id === 0) {
      this.router.navigate(['/login']);
      return Promise.resolve([]);
    } else {
      this.progressbarService.start();

      return new Promise((resolve, reject) => {
        this.http
          .get<ISet[]>(
            `${this.url}/set/byUser`,
            // `${this.url}/set/${this.authenticationService.userInfo().id}`,
            {
              observe: 'events',
              reportProgress: true,
            },
          )
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
        (event.status === 200 || event.status === 201) &&
        Array.isArray(event.body) &&
        event.body?.length
      ) {
        this.sets.set(event.body);
        resolve(event.body);
      } else if ((event.status === 200 || event.status === 201) && event.body) {
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
        .post<ISet>(`${this.url}/set`, setDto, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe({
          next: (event: HttpEvent<ISet>) => {
            this.downloadProgressbarRequest(event, resolve, reject);
            if (event.type === HttpEventType.Response && event.status === 201) {
              this.getSetsList();
            }
          },
          error: (err) => reject(err),
        });
    });
  }
}
