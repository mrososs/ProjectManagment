import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

// export class ValidationService {

//   // Method to get the error message for required field
//    getErrorMessage(control: AbstractControl): string | null {
//     if (control.hasError('required')) {
//       return 'This field is required';
//     }
//     if (control.hasError('minlength')) {
//       return `Minimum length is ${control.getError('minlength').requiredLength}`;
//     }
//     if (control.hasError('maxlength')) {
//       return `Maximum length is ${control.getError('maxlength').requiredLength}`;
//     }
//     if (control.hasError('email')) {
//       return 'Enter a valid email';
//     }
//     if (control.hasError('pattern')) {
//       return 'Invalid format';
//     }
//     return null; // no error
//   }

//   // Method to check if control has any error
//    hasError(control: AbstractControl): boolean {
//     return control && control.invalid && (control.dirty || control.touched);
//   }
// }

export class getErrorMessage {

  // Method to get the error message for required field
  getErrorMessage(control: AbstractControl): string | null {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('minlength')) {
      return `Minimum length is ${control.getError('minlength').requiredLength}`;
    }
    if (control.hasError('maxlength')) {
      return `Maximum length is ${control.getError('maxlength').requiredLength}`;
    }
    if (control.hasError('email')) {
      return 'Enter a valid email';
    }
    if (control.hasError('pattern')) {
      return 'Invalid format';
    }
    return null; // no error
  }

}

export class hasError {
   // Method to check if control has any error
   hasError(control: AbstractControl): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}
