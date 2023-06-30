import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { PersonnelListComponent } from './personnels/personnel-list/personnel-list.component';
import { PersonnelEditComponent } from './personnels/personnel-edit/personnel-edit.component';
import { PersonnelAddComponent } from './personnels/personnel-add/personnel-add.component';
import { PersonnelViewComponent } from './personnels/personnel-view/personnel-view.component';
import { ProfileEditComponent } from './auth/profile/profile-edit/profile-edit.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent }, 
    { path: 'forgot-password', component: ForgotPasswordComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { path: '', redirectTo: 'login', pathMatch: 'full'},
  ]},
  { path: 'layouts', component: LayoutsComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/edit', component: ProfileEditComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'personnels/personnel-list', component: PersonnelListComponent },
    { path: 'personnels/personnel-add', component: PersonnelAddComponent },
    { path: 'personnels/:id/personnel-edit', component: PersonnelEditComponent },
    { path: 'personnels/:id/personnel-view', component: PersonnelViewComponent },
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  ]},

  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: '**', redirectTo: 'auth', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
