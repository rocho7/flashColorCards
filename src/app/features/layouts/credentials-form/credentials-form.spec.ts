import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsForm } from './credentials-form';
import { InputTextModule } from 'primeng/inputtext';
import { FormArray, FormBuilder } from '@angular/forms';
import { IAthenticationState } from '../../../classes/authentication/interfaces/authentication-state.interface';
import { provideRouter } from '@angular/router';
import { Login } from '../../../classes/authentication/login.class';
import { Signup } from '../../../classes/authentication/signup.class';

describe('CredentialsForm', () => {
  let component: CredentialsForm;
  let fixture: ComponentFixture<CredentialsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialsForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialsForm);
    component = fixture.componentInstance;
    const formBuilder = TestBed.inject(FormBuilder);
    const form = formBuilder.group({
      authFields: formBuilder.array([
        formBuilder.group({
          email: [''],
          password: [''],
        }),
      ]),
    });
    const formInstance: IAthenticationState = {
      fields: form.get('authFields') as FormArray,
      setForm: () => undefined,
      getForm: () => form,
      addAuthenticationFields: () => undefined,
      getTitle: () => 'Logearse',
      confirm: () => undefined,
      getObteinCredentialsLiteral: () => 'No tienes cuenta aún? Click aquí!',
      getRoutePath: () => 'sign-up',
    };
    fixture.componentRef.setInput('formInstance', formInstance);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form', () => {
    expect(component.form).toBeDefined();
    expect(component.form instanceof Login || component.form instanceof Signup)
      .toBeTruthy;
    expect(component.form.get('email')).toBeDefined;
    expect(component.form.get('password')).toBeDefined;
  });

  it('Should show error, when fields are empty', () => {
    const emailControl = component.form
      .get('authFields')
      ?.get([0])
      ?.get('email');
    const passwordControl = component.form
      .get('authFields')
      ?.get([0])
      ?.get('password');
    console.log(
      '%cemailControl TEST ',
      'background: green; color: white; display: block;',
      emailControl,
    );

    expect(emailControl?.invalid).toBeTruthy;
    expect(passwordControl?.invalid).toBeTruthy;
  });

  it('Should validate email field', () => {
    const emailControl = component.form
      .get('authFields')
      ?.get([0])
      ?.get('email');
    emailControl?.setValue('caca@huete.com');
    console.log(
      '%cvalid ',
      'background: purple; color: white; display: block;',
      emailControl,
    );
    expect(emailControl?.valid).toBeTruthy();
  });

  it('Should validate password field', () => {
    const passwordControl = component.form
      .get('authFields')
      ?.get([0])
      ?.get('password');
    passwordControl?.setValue('123');

    expect(passwordControl?.valid).toBeTruthy();
  });

  it('Shoul click confirm button', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    const form = formBuilder.group({
      authFields: formBuilder.array([
        formBuilder.group({
          email: [''],
          password: [''],
        }),
      ]),
    });
    const formInstance: IAthenticationState = {
      fields: form.get('authFields') as FormArray,
      setForm: () => undefined,
      getForm: () => form,
      addAuthenticationFields: () => undefined,
      getTitle: () => 'Logearse',
      confirm: () => undefined,
      getObteinCredentialsLiteral: () => 'No tienes cuenta aún? Click aquí!',
      getRoutePath: () => 'sign-up',
    };
    const confirmSpy = spyOn(formInstance, 'confirm');
    fixture.componentRef.setInput('formInstance', formInstance);
    const emailControl = component.form
      .get('authFields')
      ?.get([0])
      ?.get('email');

    emailControl?.setValue('hola@caracola.com');
    const passwordControl = component.form
      .get('authFields')
      ?.get([0])
      ?.get('password');
    passwordControl?.setValue('123');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();

    fixture.detectChanges();

    expect(confirmSpy).toHaveBeenCalled();
  });
});
