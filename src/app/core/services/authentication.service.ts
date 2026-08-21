import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { API_URL, TOKEN_KEY } from '../constants/global.constant';
import { IUserInfo } from './interfaces/authentication.interface';
import { ProgressbarService } from '../../features/layouts/progressbar/services/progressbar';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userInfo = computed(() => this.user());
  private user: WritableSignal<IUserInfo> = signal({
    id: 0,
    email: '',
    name: '',
  });
  private http = inject(HttpClient);
  private router = inject(Router);
  private progressbarService = inject(ProgressbarService);

  // url: string = 'https://flashcolorcardsapi.onrender.com';
  private url: string = API_URL;

  getLogin(email: string, password: string) {
    this.progressbarService.start();
    localStorage.removeItem(TOKEN_KEY);
    const body = {
      email,
      password,
    };
    this.http
      .post<{ jwt: string }>(`${this.url}/api/auth/login`, body)
      .pipe(finalize(() => this.progressbarService.stop()))
      .subscribe(
        (token: { jwt: string }) => {
          console.log(
            '%ctoken ',
            'color: white; background-color: #007acc;',
            token,
          );
          if (token) {
            // this.getUserInfo(email);
            localStorage.setItem(TOKEN_KEY, JSON.stringify(token.jwt));
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          console.log(
            '%cCredentials error ',
            'color: red; display: block; width: 100%;',
            err,
          );
        },
      );
  }

  getUserInfo(email: string): void {
    this.http.get<IUserInfo>(`${this.url}/api/auth/${email}`).subscribe({
      next: (res: IUserInfo) => this.user.set(res),
      error: (_err) => this.user.set({ id: 0, email: '', name: '' }),
    });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  postRegister(credentials: { name: string; email: string; password: string }) {
    const body = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };
    this.http
      .post(`${this.url}/api/auth/register`, body)
      .subscribe((isRegistered) => {
        if (isRegistered) {
          this.getLogin(credentials.email, credentials.password);
        }
      });
  }
}
