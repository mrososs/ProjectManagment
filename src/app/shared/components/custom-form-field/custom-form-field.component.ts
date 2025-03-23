import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-form-field',
  templateUrl: './custom-form-field.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CustomFormFieldComponent {
  @Input() label!: string; // Label like "E-mail"
  @Input() placeholder!: string; // Placeholder like "Enter your E-mail"
  @Input() control!: FormControl; // Keep this as FormControl
  @Input() type: string = 'text'; // New Input Property with Default "text"
  getErrorMessage(): string {
    if (this.control.errors?.['required']) return 'This field is required.';
    if (this.control.errors?.['email']) return 'Invalid email format.';
    if (this.control.errors?.['minlength'])
      return `Minimum ${this.control.errors['minlength'].requiredLength} characters required.`;
    if (this.control.errors?.['pattern']) return 'Invalid format.';
    return 'Invalid input.';
  }
}
