import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export class RegisterFormValidations {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static isValidFieldInArray(
    formArray: FormArray,
    index: number,
    field: string,
  ) {
    const fieldIndex = formArray.controls[index] as FormGroup;
    const fieldIndexControls = this.getFieldIndexControls(
      formArray,
      index,
      field,
    );

    return fieldIndexControls.errors && fieldIndexControls.touched;
  }

  static getFieldIndexControls(
    formArray: FormArray,
    index: number,
    field: string,
  ) {
    const fieldIndex = formArray.controls[index] as FormGroup;
    return fieldIndex.controls[field];
  }

  static getFieldArrayErrorMessage(
    formArray: FormArray,
    index: number,
    field: string,
  ): string | null {
    if (formArray.controls.length === 0) return null;

    if (formArray.controls[0].errors)
      return this.getMessagesErrors(formArray.controls[0].errors);

    const errors =
      this.getFieldIndexControls(formArray, index, field).errors ?? {};

    return this.getMessagesErrors(errors);
  }

  static getMessagesErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      console.log(
        '%ckey ',
        'background: green; color: white; display: block;',
        key,
      );
      switch (key) {
        case 'required':
          return 'Campo obligatorio';

        case 'passwordNotEqual':
          return 'Los passwords no coinciden';
      }
    }
    return null;
  }

  static arePasswordsEquals(password1: string, password2: string) {
    return (formGroup: AbstractControl) => {
      const pass1 = formGroup.get(password1)?.value;
      const pass2 = formGroup.get(password2)?.value;

      console.log(
        '%cpasswords ',
        'color: red; display: block; width: 100%;',
        pass1,
        pass2,
      );

      return pass1 === pass2 ? null : { passwordNotEqual: true };
    };
  }
}
