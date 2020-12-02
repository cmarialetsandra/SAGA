import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ValidarQueSeanIguales: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('Contrasenia');
  const confirmarPassword = control.get('ConfirmarContrasenia');

  return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
};
