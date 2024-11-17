import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';

export class CustomValidators {
  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;

    return password && passwordConfirmation && password !== passwordConfirmation
      ? { passwordMismatch: true }
      : null;
  }

  static usernameExists(userService: UserService): AsyncValidatorFn {       
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      if (control.value == '') {
        return null as any;
      }
      else {
        return userService.getByuserName(control.value)
            .then(response => {
                console.log("que ond apa");
                return response ? { 'usernameExists': { value: control.value } } : null;
            })
            .catch(error => {
              return null;
            })
      }                  
    };
  }


  
}
