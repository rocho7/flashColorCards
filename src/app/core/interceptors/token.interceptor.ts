import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from '../constants/global.constant';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { IUserInfo } from '../services/interfaces/authentication.interface';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);

  const tokenKey = localStorage.getItem(TOKEN_KEY);
  console.log(
    '%ctokenKey ',
    'color: white; background-color: #007acc;',
    tokenKey,
  );
  if (tokenKey !== null) {
    const token = JSON.parse(tokenKey);
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    getInfoUser(req, authenticationService);

    return next(newReq).pipe(
      catchError((error: HttpErrorResponse) =>
        checkStatus401(error, req, authenticationService),
      ),
    );
  } else {
    const authenticationService = inject(AuthenticationService);

    getInfoUser(req, authenticationService);
    return next(req);
  }
};

const getInfoUser = (
  req: any,
  authenticationService: AuthenticationService,
) => {
  if (
    req &&
    req.body &&
    Object.keys(req.body).includes('email')
    // &&
    // authenticationService.userInfo().id === 0
  ) {
    const body = req.body as IUserInfo;
    authenticationService.getUserInfo(body['email']);
  }
};

const checkStatus401 = (
  error: HttpErrorResponse,
  req: any,
  authenticationService: AuthenticationService,
) => {
  if (error.status === 401 && !req.url.includes('/login')) {
    authenticationService.logout();
  }
  return throwError(() => error);
};
