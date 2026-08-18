import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IAthenticationState } from '../../../classes/authentication/interfaces/authentication-state.interface';
import { Signup } from '../../../classes/authentication/signup.class';
import { CredentialsForm } from '../../layouts/credentials-form/credentials-form';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  imports: [CredentialsForm],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.scss',
})
export class SignUpComponent implements OnInit {
  signupInstance!: IAthenticationState;
  form!: FormGroup;
  formFields!: FormArray;

  fb = inject(FormBuilder);
  authenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    this.setSignupLogin();
  }

  setSignupLogin(): void {
    this.signupInstance = new Signup(this.fb, this.authenticationService);
    this.formFields = this.signupInstance.fields;
    this.form = this.signupInstance.getForm();
  }
}
