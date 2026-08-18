import { FormArray, FormGroup } from '@angular/forms';

export interface IAthenticationState {
  setForm(): void;
  getForm(): FormGroup;
  readonly fields: FormArray;
  addAuthenticationFields(): void;
  getTitle(): string;
  confirm(): void;
  getObteinCredentialsLiteral(): string;
  getRoutePath(): string;
}
