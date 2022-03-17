import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
