import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormFieldComponent } from './components/custom-form-field/custom-form-field.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomFormFieldComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,RouterModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CustomFormFieldComponent,
  ],
})
export class SharedModule {}
