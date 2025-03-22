import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormFieldComponent } from './components/custom-form-field/custom-form-field.component';

@NgModule({
  declarations: [CustomFormFieldComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormFieldComponent,
  ],
})
export class SharedModule {}
