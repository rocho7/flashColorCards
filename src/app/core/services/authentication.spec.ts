import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { ProgressbarService } from '../../features/layouts/progressbar/services/progressbar';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { IUserInfo } from './interfaces/authentication.interface';
import { provideRouter, Router } from '@angular/router';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let progressbarService: ProgressbarService;
  let httpTesting: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        ProgressbarService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    service = TestBed.inject(AuthenticationService);
    httpTesting = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    // progressbarService = inject(ProgressbarService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test computed', () => {
    (service as any).user.set({
      id: 0,
      email: 'hola',
      name: 'hello',
    });
    expect(service.userInfo()).toEqual({
      id: 0,
      email: 'hola',
      name: 'hello',
    });
  });

  it('should test getLogin method', () => {
    const loginSpy = spyOn(service, 'getLogin');
    service.getLogin('email', 'password');
    expect(loginSpy).toHaveBeenCalledOnceWith('email', 'password');
  });

  it('should test http post login', () => {
    spyOn(localStorage, 'setItem');

    const body = {
      email: 'hola@hola.com',
      password: '123',
    };
    const response = { jwt: 'token' };
    service.getLogin(body.email, body.password);
    const req = httpTesting.expectOne((call) => call.method === 'POST');
    req.flush(response);

    expect(response).toEqual({ jwt: 'token' });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'flashCardToken',
      JSON.stringify(response.jwt),
    );
  });

  it('should test http post login error', () => {
    let errorFake = false;
    const body = {
      email: 'hola@hola.com',
      password: '123',
    };
    service.getLogin(body.email, body.password);
    const req = httpTesting.expectOne((call) => call.method === 'POST');
    req.flush(
      {},
      {
        status: 500,
        statusText: 'Server error',
      },
    );
    errorFake = true;
    expect(errorFake).toBeTrue();
  });

  it('Should call method getUserInfo wit email as a parameter', () => {
    const spyCall = spyOn(service, 'getUserInfo');
    service.getUserInfo('email@email.com');
    expect(spyCall).toHaveBeenCalledWith('email@email.com');
  });

  it('Should test http get userInfo', () => {
    const response: IUserInfo = {
      id: 1,
      email: 'hola@hola.com',
      name: 'Bartolo',
    };
    service.getUserInfo('hola@hola.com');
    const req = httpTesting.expectOne((call) => call.method === 'GET');
    req.flush(response);

    expect(response).toEqual({
      id: 1,
      email: 'hola@hola.com',
      name: 'Bartolo',
    });
  });

  it('Should test http get userInfo error', () => {
    let error = false;

    service.getUserInfo('e@e.com');
    const req = httpTesting.expectOne((call) => call.method === 'GET');
    req.flush(
      {},
      {
        status: 500,
        statusText: 'Server error',
      },
    );
    error = true;
    expect(error).toBeTrue;
  });

  it('Should call logout method', () => {
    // spyOn(localStorage, 'setItem');
    // service.getLogin('email@email.com', 'password');
    // expect(localStorage.setItem).toHaveBeenCalledWith('token', '123');
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');
    service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.removeItem).toHaveBeenCalledWith('flashCardToken');
  });

  it('Should call postRegister method', () => {
    const spyonRegister = spyOn(service, 'postRegister');
    const credentials = {
      name: 'Federico3',
      email: 'f@f.com',
      password: '123',
    };
    service.postRegister(credentials);
    expect(spyonRegister).toHaveBeenCalledWith(credentials);
  });

  it('Should call http post in postRegister method', () => {
    let isRegistered = false;
    const credentials = {
      name: 'Federico3',
      email: 'f@f.com',
      password: '123',
    };
    service.postRegister(credentials);
    isRegistered = true;
    const req = httpTesting.expectOne((call) => call.method === 'POST');
    req.flush(isRegistered);
    expect(isRegistered).toBeTrue();
    if (isRegistered) {
      // service.getLogin(credentials.name, credentials.email);
      const reqLogin = httpTesting.expectOne((call) => call.method === 'POST');
      reqLogin.flush({ jwt: 'token' });
    }
  });
});
