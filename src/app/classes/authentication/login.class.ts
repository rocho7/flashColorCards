import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAthenticationState } from './interfaces/authentication-state.interface';
import { AuthenticationService } from '../../core/services/authentication.service';

export class Login implements IAthenticationState {
  private form!: FormGroup;
  // private fields!: FormArray;
  // private form!: FormGroup;

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
    // this.form = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required]],
    // });
  }

  getForm(): FormGroup {
    return this.form;
  }

  get fields(): FormArray {
    return this.form.get('authFields') as FormArray;
  }

  addAuthenticationFields(): void {
    const fields = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.fields.push(fields);
  }

  confirm(): void {
    const controlsValue = this.fields.controls[0].value;
    console.log(
      '%ccontrols ',
      'background: green; color: white; display: block;',
      controlsValue,
    );
    this.authenticationService.getLogin(
      controlsValue.email,
      controlsValue.password,
    );
  }

  getTitle(): string {
    return 'Logearse';
  }

  getObteinCredentialsLiteral(): string {
    return 'No tienes cuenta aún? Click aquí!';
  }
  getRoutePath(): string {
    return 'sign-up';
  }
}
