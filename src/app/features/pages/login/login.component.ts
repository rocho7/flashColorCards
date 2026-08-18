import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { IAthenticationState } from '../../../classes/authentication/interfaces/authentication-state.interface';
import { Login } from '../../../classes/authentication/login.class';
import { CredentialsForm } from '../../layouts/credentials-form/credentials-form';

@Component({
  selector: 'app-login',
  imports: [CredentialsForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginInstance!: IAthenticationState;

  authenticationService = inject(AuthenticationService);
  fb = inject(FormBuilder);

  router = inject(Router);

  form!: FormGroup;
  formFields!: FormArray;
  // form: FormGroup = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required]],
  // });

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm(): void {
    this.loginInstance = new Login(this.fb, this.authenticationService);
    this.formFields = this.loginInstance.fields;
    this.form = this.loginInstance.getForm();
  }

  login(): void {
    this.authenticationService.getLogin(
      this.form.controls['email'].value,
      this.form.controls['password'].value,
    );
  }
}
