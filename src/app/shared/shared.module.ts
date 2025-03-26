import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormFieldComponent } from './components/custom-form-field/custom-form-field.component';
import { RouterModule } from '@angular/router';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { ValidateDirective } from './directives/validate.directive';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';


@NgModule({
  declarations: [CustomFormFieldComponent, FilePreviewComponent,ValidateDirective,SplashScreenComponent ,
    CustomTableComponent
  ],
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
    SplashScreenComponent,
    ValidateDirective,
    FilePreviewComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CustomFormFieldComponent,
    CustomTableComponent
  ],
})
export class SharedModule {}
