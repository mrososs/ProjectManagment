import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
<<<<<<< HEAD
import { provideHttpClient,withInterceptorsFromDi,} from '@angular/common/http';
=======
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';

>>>>>>> origin/main
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormFieldComponent } from './components/custom-form-field/custom-form-field.component';
import { RouterModule } from '@angular/router';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { ValidateDirective } from './directives/validate.directive';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
<<<<<<< HEAD
import { MatCardModule } from '@angular/material/card';
=======
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
>>>>>>> origin/main

@NgModule({
  declarations: [
    CustomFormFieldComponent,
    FilePreviewComponent,
    ValidateDirective,
    SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CanvasJSAngularChartsModule, // Import CanvasJS Module

    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    MatCardModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [
    MaterialModule,
    CanvasJSAngularChartsModule, // Import CanvasJS Module
    SplashScreenComponent,
    ValidateDirective,
    FilePreviewComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CustomFormFieldComponent,
  ],
})
export class SharedModule {}
