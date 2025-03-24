import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { getErrorMessage } from '../../services/validation-service.service';
import { hasError } from '../../services/validation-service.service';



@Component({
  selector: 'app-custom-form-field',
  templateUrl: './custom-form-field.component.html',
  standalone :false ,
  encapsulation: ViewEncapsulation.None,
})
export class CustomFormFieldComponent {
  @Input() label!: string; // Label like "E-mail"
  @Input() placeholder!: string; // Placeholder like "Enter your E-mail"
  @Input() control!: FormControl; // Keep this as FormControl
  @Input() type: string = 'text'; // New Input Property with Default "text"

  @Input() matcher: ErrorStateMatcher = new MyErrorStateMatcher; // Validators

 @Input() hasError :boolean |any  = new hasError;
 @Input()  getErrorMessage   :string | null |any = new getErrorMessage;


}
// -----------------------------------------------------


  // custom Error
  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!(control && control.invalid && (control.touched  || control.dirty));
    }
  }
