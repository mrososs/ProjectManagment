import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(
  form: AbstractControl
): ValidationErrors | null {
  {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) return null; // Safety check

    if (
      confirmPassword.errors &&
      !confirmPassword.errors['passwordsMismatch']
    ) {
      return null; // Skip if other validation errors exist
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true }); // Set error
    } else {
      confirmPassword.setErrors(null); // Remove error if fixed
    }

    return null;
  }
}
