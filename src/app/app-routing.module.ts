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
import { PointageComponent } from './presences/pointage/pointage.component';
import { PointageMatriculeComponent } from './presences/pointage/pointage-matricule/pointage-matricule.component';  
import { RegistrePresenceComponent } from './presences/registre-presence/registre-presence.component';
import { SyndicatsComponent } from './syndicats/syndicats.component';
import { PostesComponent } from './recrutements/postes/postes.component';
import { CandidaturesComponent } from './recrutements/candidatures/candidatures.component';
import { PosteAddComponent } from './recrutements/postes/poste-add/poste-add.component';
import { PosteEditComponent } from './recrutements/postes/poste-edit/poste-edit.component';
import { PosteViewComponent } from './recrutements/postes/poste-view/poste-view.component';
import { CandidatureAddComponent } from './recrutements/candidatures/candidature-add/candidature-add.component';
import { CandidatureEditComponent } from './recrutements/candidatures/candidature-edit/candidature-edit.component';
import { CandidatureViewComponent } from './recrutements/candidatures/candidature-view/candidature-view.component';
import { SyndicatViewComponent } from './syndicats/syndicat-view/syndicat-view.component';
import { PrimesComponent } from './primes/primes.component';
import { HeuresSuppComponent } from './heures-supp/heures-supp.component';
import { PenalitesComponent } from './penalites/penalites.component';
import { AvanceSalairesComponent } from './avance-salaires/avance-salaires.component';
import { AvanceSalaireDetailComponent } from './avance-salaires/avance-salaire-detail/avance-salaire-detail.component'; 
import { PrimeDetailComponent } from './primes/prime-detail/prime-detail.component';
import { PenaliteDetailComponent } from './penalites/penalite-detail/penalite-detail.component';
import { HeureSuppDetailComponent } from './heures-supp/heure-supp-detail/heure-supp-detail.component';
import { HoraireComponent } from './horaire/horaire.component';
import { PerformencesComponent } from './performences/performences.component';
import { ArchivesComponent } from './archives/archives.component';
import { SalairesComponent } from './salaires/salaires.component';

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

    { path: 'presences/pointage', component: PointageComponent },
    { path: 'presences/pointage/:id', component: PointageMatriculeComponent },
    { path: 'presences/registre-presences', component: RegistrePresenceComponent }, 
    { path: 'presences/heures-supp', component: HeuresSuppComponent },
    { path: 'presences/heures-supp/:id/detail', component: HeureSuppDetailComponent },
                                                                                                                                                                           
    { path: 'personnels/syndicats', component: SyndicatsComponent },
    { path: 'personnels/syndicats/:id/view', component: SyndicatViewComponent },

    { path: 'recrutements/postes', component: PostesComponent },
    { path: 'recrutements/postes/poste-add', component: PosteAddComponent },
    { path: 'recrutements/postes/:id/poste-edit', component: PosteEditComponent },
    { path: 'recrutements/postes/:id/poste-view', component: PosteViewComponent },
    { path: 'recrutements/candidatures', component: CandidaturesComponent },
    { path: 'recrutements/candidatures/:id/candidature-add', component: CandidatureAddComponent },
    { path: 'recrutements/candidatures/:id/candidature-edit', component: CandidatureEditComponent },
    { path: 'recrutements/candidatures/:id/candidature-view', component: CandidatureViewComponent },

    { path: 'salaires/primes', component: PrimesComponent },
    { path: 'salaires/primes/:id/detail', component: PrimeDetailComponent },
    { path: 'salaires/penalites', component: PenalitesComponent },
    { path: 'salaires/penalites/:id/detail', component: PenaliteDetailComponent },
    { path: 'salaires/avance-salaire', component: AvanceSalairesComponent },
    { path: 'salaires/avance-salaire/:id/detail', component: AvanceSalaireDetailComponent },

    { path: 'salaires/releve-salaire', component: SalairesComponent },
    

    { path: 'horaire', component: HoraireComponent },

    { path: 'performences', component: PerformencesComponent },

    { path: 'archives', component: ArchivesComponent },

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
