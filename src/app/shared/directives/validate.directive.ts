import { Directive, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[pmValidate]',
})
export class ValidateDirective implements AfterViewInit {
  @Input('pmValidate') control!: AbstractControl; // Get control from Input

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.control) {
      console.error('pmValidate directive requires a FormControl.');
      return;
    }

    // Listen for status changes and update validation messages
    this.control.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });

    // Initial validation check
    this.updateErrorMessage();
  }

  private updateErrorMessage(): void {
    const parentElement = this.el.nativeElement.closest('.mat-form-field');
    if (!parentElement) return;

    // Remove any existing error messages
    const existingError = parentElement.querySelector('.validation-error');
    if (existingError) {
      this.renderer.removeChild(parentElement, existingError);
    }

    // Show error message if invalid
    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      const errorMessage = this.getErrorMessage();
      const errorElement = this.renderer.createElement('mat-error');
      this.renderer.addClass(errorElement, 'validation-error');

      const text = this.renderer.createText(errorMessage);
      this.renderer.appendChild(errorElement, text);
      this.renderer.appendChild(parentElement, errorElement);
    }
  }

  private getErrorMessage(): string {
    if (this.control.errors?.['required']) return 'This field is required.';
    if (this.control.errors?.['email']) return 'Invalid email format.';
    if (this.control.errors?.['minlength']) return `Minimum ${this.control.errors['minlength'].requiredLength} characters required.`;
    if (this.control.errors?.['pattern']) return 'Invalid format.';
    return 'Invalid input.';
  }
}
