import {AbstractControl, ValidationErrors} from "@angular/forms";

export class BirthdateValidators {

  static cannotBeBiggerThanCurrentDate(control: AbstractControl) : ValidationErrors | null {
      const today = new Date().getTime()
      if(!(control && control.value))
        return null;
      return control.value.getTime() > today ? {invalidDate: 'You cannot use future dates'} : null;

  }
}
