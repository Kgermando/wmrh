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
import { InboxComponent } from './mail/inbox/inbox.component';
import { ComposeComponent } from './mail/compose/compose.component';
import { ReadComponent } from './mail/read/read.component';
import { BrouillonComponent } from './mail/brouillon/brouillon.component';
import { ReglagesComponent } from './preferences/reglages/reglages.component';
import { FonctionComponent } from './preferences/fonction/fonction.component';
import { DepartementsComponent } from './preferences/departements/departements.component';
import { ServicesComponent } from './preferences/services/services.component';
import { TitlesComponent } from './preferences/titles/titles.component';
import { SiteLocationComponent } from './preferences/site-location/site-location.component';

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

    { path: 'preferences/reglages', component: ReglagesComponent },
    { path: 'preferences/fonction', component: FonctionComponent },
    { path: 'preferences/departement', component: DepartementsComponent },
    { path: 'preferences/services', component: ServicesComponent },
    { path: 'preferences/titles', component: TitlesComponent },
    { path: 'preferences/site-location', component: SiteLocationComponent },


    { path: 'mail/inbox', component: InboxComponent },
    { path: 'mail/compose', component: ComposeComponent },
    { path: 'mail/read-mail', component: ReadComponent },
    { path: 'mail/brouillon', component: BrouillonComponent },
    
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
