import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    // AuthComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    // LoginPageComponent,
  ],
  imports: [CommonModule, AuthRoutingModule ,  SharedModule],
})
export class AuthModule {}
