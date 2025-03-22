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
}
