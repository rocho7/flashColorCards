import { inject } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAthenticationState } from './interfaces/authentication-state.interface';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RegisterFormValidations } from '../validations/register.class';

export class Signup implements IAthenticationState {
  // export class Signup implements IAthenticationState {
  private form!: FormGroup;
  private validations = RegisterFormValidations;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
  ) {
    this.setForm();
  }

  setForm(): void {
    this.form = this.fb.group({
      authFields: this.fb.array([]),
    });
    this.addAuthenticationFields();
  }
  get fields(): FormArray<any> {
    return this.form.get('authFields') as FormArray;
  }

  getForm(): FormGroup {
    return this.form;
  }

  addAuthenticationFields(): void {
    const fields = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordRepeated: ['', [Validators.required]],
      },
      {
        validators: [
          this.validations.arePasswordsEquals('password', 'passwordRepeated'),
        ],
      },
    );
    this.fields.push(fields);
  }

  confirm(): void {
    const controlsValue = this.fields.controls[0].value;
    this.authenticationService.postRegister(controlsValue);
  }

  getTitle(): string {
    return 'Registrarse';
  }

  getObteinCredentialsLiteral(): string {
    return 'Ya tienes cuenta? Click aquí!';
  }
  getRoutePath(): string {
    return '/';
  }
}
