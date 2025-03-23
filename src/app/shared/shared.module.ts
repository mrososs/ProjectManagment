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
import { FilePreviewComponent } from './components/file-preview/file-preview.component';

@NgModule({
  declarations: [CustomFormFieldComponent, FilePreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [
    MaterialModule,
    FilePreviewComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CustomFormFieldComponent,
  ],
})
export class SharedModule {}
