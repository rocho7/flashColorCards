import { Component, input, OnInit } from '@angular/core';
import { IAthenticationState } from '../../../classes/authentication/interfaces/authentication-state.interface';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { RegisterFormValidations } from '../../../classes/validations/register.class';

@Component({
  selector: 'app-credentials-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    FloatLabel,
    JsonPipe,
  ],
  templateUrl: './credentials-form.html',
  styleUrl: './credentials-form.scss',
})
export class CredentialsForm implements OnInit {
  formInstance = input.required<IAthenticationState>();

  validations = RegisterFormValidations;

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.formInstance()?.getForm()!;
  }
}
