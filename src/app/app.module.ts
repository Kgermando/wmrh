import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { QRCodeModule } from 'angularx-qrcode';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangePasswordDialogBox, ChangePhotoDialogBox, ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { PersonnelListComponent } from './personnels/personnel-list/personnel-list.component';
import { PersonnelAddComponent } from './personnels/personnel-add/personnel-add.component';
import { PersonnelEditComponent } from './personnels/personnel-edit/personnel-edit.component';
import { PersonnelViewComponent } from './personnels/personnel-view/personnel-view.component'; 
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DatePipe } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './shared/shared.module';
import { CustomizerSettingsComponent } from './customizer-settings/customizer-settings.component';
import { InfoProfileComponent } from './auth/profile/info-profile/info-profile.component'; 
import { ProfilePaieComponent } from './auth/profile/profile-paie/profile-paie.component';
import { ProfileEditComponent } from './auth/profile/profile-edit/profile-edit.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CredentialInterceptor } from './interceptors/credential.interceptor'; 
import { InboxComponent } from './mail/inbox/inbox.component';
import { ComposeComponent } from './mail/compose/compose.component';
import { ReadComponent } from './mail/read/read.component';
import { BrouillonComponent } from './mail/brouillon/brouillon.component';
import { EmailSidebarComponent } from './mail/email-sidebar/email-sidebar.component'; 
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { DepartementsComponent, EditDepartementDialogBox } from './preferences/departements/departements.component';
import { EditReglageDialogBox, ReglagesComponent } from './preferences/reglages/reglages.component';
import { EditTitleDialogBox, TitlesComponent } from './preferences/titles/titles.component';
import { EditFonctionDialogBox, FonctionComponent } from './preferences/fonction/fonction.component';
import { EditServiceDialogBox, ServicesComponent } from './preferences/services/services.component';
import { EditSiteLocationDialogBox, SiteLocationComponent } from './preferences/site-location/site-location.component';
import { PointageComponent } from './presences/pointage/pointage.component';
import { PointageMatriculeComponent } from './presences/pointage/pointage-matricule/pointage-matricule.component';
import { PointageSidebarComponent } from './presences/pointage/pointage-sidebar/pointage-sidebar.component'; 
import { PenaliteSAddDialogBox, PresenceFormComponent } from './presences/pointage/presence-form/presence-form.component';
import { PresenceCalendarComponent } from './presences/pointage/presence-calendar/presence-calendar.component';
import { PresencePieMonthComponent } from './presences/pointage/presences-pie/presence-pie-month/presence-pie-month.component';
import { PresencePieYearComponent } from './presences/pointage/presences-pie/presence-pie-year/presence-pie-year.component';
import { PresencePieAllComponent } from './presences/pointage/presences-pie/presence-pie-all/presence-pie-all.component';
import { PresencesPieComponent } from './presences/pointage/presences-pie/presences-pie.component'; 
import { EditPresenceDialogBox, PointageTableComponent } from './presences/pointage/pointage-table/pointage-table.component';
import { RegistrePresenceComponent } from './presences/registre-presence/registre-presence.component';
import { SyndicatsComponent } from './syndicats/syndicats.component';
import { CandidaturesComponent } from './recrutements/candidatures/candidatures.component';
import { PostesComponent } from './recrutements/postes/postes.component';
import { PosteAddComponent } from './recrutements/postes/poste-add/poste-add.component';
import { PosteEditComponent } from './recrutements/postes/poste-edit/poste-edit.component';
import { PosteViewComponent } from './recrutements/postes/poste-view/poste-view.component';
import { CandidatureAddComponent } from './recrutements/candidatures/candidature-add/candidature-add.component';
import { CandidatureEditComponent } from './recrutements/candidatures/candidature-edit/candidature-edit.component';
import { CandidatureViewComponent } from './recrutements/candidatures/candidature-view/candidature-view.component';
import { SyndicatViewComponent } from './syndicats/syndicat-view/syndicat-view.component'; 
import { PrimeAddDialogBox, PrimesComponent } from './primes/primes.component';
import { PenaliteAddDialogBox, PenalitesComponent } from './penalites/penalites.component';
import { AvanceSalaireAddDialogBox, AvanceSalairesComponent } from './avance-salaires/avance-salaires.component';
import { HeureSuppAddDialogBox, HeuresSuppComponent } from './heures-supp/heures-supp.component';
import { PresencePointageComponent } from './presences/pointage/pointage-sidebar/presence-pointage/presence-pointage.component';
import { AvanceSalaireDetailComponent, EditAvanceSalaireDialogBox } from './avance-salaires/avance-salaire-detail/avance-salaire-detail.component';
import { AvanceSalaireTableComponent } from './avance-salaires/avance-salaire-table/avance-salaire-table.component';
import { EditPrimeDialogBox, PrimeDetailComponent } from './primes/prime-detail/prime-detail.component';
import { PrimeTableComponent } from './primes/prime-detail/prime-table/prime-table.component';
import { EditPenaliteDialogBox, PenaliteDetailComponent } from './penalites/penalite-detail/penalite-detail.component';
import { PenaliteTableComponent } from './penalites/penalite-detail/penalite-table/penalite-table.component';
import { EditHeureSuppDialogBox, HeureSuppDetailComponent } from './heures-supp/heure-supp-detail/heure-supp-detail.component';
import { HeureSuppTableComponent } from './heures-supp/heure-supp-detail/heure-supp-table/heure-supp-table.component';
import { HoraireComponent } from './horaire/horaire.component';
import { PrimeFilterComponent } from './primes/prime-filter/prime-filter.component';
import { PenaliteFilterComponent } from './penalites/penalite-filter/penalite-filter.component';
import { HeureSuppFilterComponent } from './heures-supp/heure-supp-filter/heure-supp-filter.component';
import { AvanceSalaireFilterComponent } from './avance-salaires/avance-salaire-filter/avance-salaire-filter.component';
import { PerformencesComponent } from './performences/performences.component';
import { ArchivesComponent } from './archives/archives.component'; 
import { StatutsPaieComponent } from './salaires/statuts-paie/statuts-paie.component';
import { ListPaimentsComponent } from './salaires/list-paiments/list-paiments.component';
import { PaieViewComponent } from './salaires/list-paiments/paie-view/paie-view.component';
import { RelevePaieTableComponent } from './salaires/list-paiments/paie-view/releve-paie-table/releve-paie-table.component';
import { FichePaieComponent } from './salaires/statuts-paie/fiche-paie/fiche-paie.component';
import { BulletinPaieComponent } from './salaires/statuts-paie/bulletin-paie/bulletin-paie.component';
import { NumberFormatPipe } from './pipes/number-format.pipe'; 
import { RelevePaieComponent } from './salaires/releve-paie/releve-paie.component'; 
import { PerformenceAddDialogBox, PerformenceViewComponent } from './performences/performence-view/performence-view.component';
import { HospitaliteComponent } from './performences/hospitalite/hospitalite.component';
import { TravailComponent } from './performences/travail/travail.component';
import { PonctualiteComponent } from './performences/ponctualite/ponctualite.component';
import { EditPerformenceDialogBox, PerformenceTableComponent } from './performences/performence-view/performence-table/performence-table.component'; 
import { PerformencePieComponent } from './performences/performence-view/performence-pie/performence-pie.component'; 
import { PerformencePieYearComponent } from './performences/performence-view/performence-pie/performence-pie-year/performence-pie-year.component';
import { PerformencePieAllComponent } from './performences/performence-view/performence-pie/performence-pie-all/performence-pie-all.component';
import { PresEntrepriseComponent } from './salaires/pres-entreprise/pres-entreprise.component';
import { DashAllMoisComponent } from './dashboard/all/dash-all-mois/dash-all-mois.component';
import { DashAllYearComponent } from './dashboard/all/dash-all-year/dash-all-year.component';
import { DashAllComponent } from './dashboard/all/dash-all/dash-all.component';
import { EmployesMoisComponent } from './dashboard/employes/employes-mois/employes-mois.component';
import { EmployesYearComponent } from './dashboard/employes/employes-year/employes-year.component';
import { EmployesAllComponent } from './dashboard/employes/employes-all/employes-all.component';
import { FinanceAllComponent } from './dashboard/finances/finance-all/finance-all.component';
import { FinanceYearComponent } from './dashboard/finances/finance-year/finance-year.component';
import { FinanceMonthComponent } from './dashboard/finances/finance-month/finance-month.component';
import { PresenceMonthComponent } from './dashboard/presences/presence-month/presence-month.component';
import { PresenceYearComponent } from './dashboard/presences/presence-year/presence-year.component';
import { PresenceAllComponent } from './dashboard/presences/presence-all/presence-all.component';
import { AutreAllComponent } from './dashboard/autres/autre-all/autre-all.component';
import { AutreMonthComponent } from './dashboard/autres/autre-month/autre-month.component';
import { AutreYearComponent } from './dashboard/autres/autre-year/autre-year.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InternalErrorComponent,
    NotFoundComponent,
    SidebarComponent,
    CustomizerSettingsComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    DashboardComponent,
    LayoutsComponent,
    PersonnelListComponent,
    PersonnelAddComponent,
    PersonnelEditComponent,
    PersonnelViewComponent,
    InfoProfileComponent, 
    ProfilePaieComponent, 
    ProfileEditComponent, 
    ChangePasswordDialogBox,
    ChangePhotoDialogBox, 
    InboxComponent,
    ComposeComponent,
    ReadComponent,
    BrouillonComponent,
    EmailSidebarComponent,
    DepartementsComponent,
    ReglagesComponent,
    TitlesComponent,
    FonctionComponent,
    ServicesComponent,
    SiteLocationComponent,
    EditDepartementDialogBox,
    EditFonctionDialogBox,
    EditServiceDialogBox,
    EditTitleDialogBox,
    EditSiteLocationDialogBox,
    EditReglageDialogBox, 
    PointageComponent, 
    PointageMatriculeComponent, 
    PointageSidebarComponent,
    PresenceFormComponent,
    PresenceCalendarComponent, 
    PresencePieMonthComponent, 
    PresencePieYearComponent, 
    PresencePieAllComponent, 
    PresencesPieComponent,
    PointageTableComponent,
    RegistrePresenceComponent,
    SyndicatsComponent,
    CandidaturesComponent,
    PostesComponent,
    PosteAddComponent,
    PosteEditComponent,
    PosteViewComponent,
    CandidatureAddComponent,
    CandidatureEditComponent,
    CandidatureViewComponent,
    SyndicatViewComponent,
    PrimesComponent,
    PenalitesComponent,
    AvanceSalairesComponent,
    HeuresSuppComponent,
    PresencePointageComponent,
    EditPresenceDialogBox,
    AvanceSalaireDetailComponent,
    AvanceSalaireAddDialogBox,
    AvanceSalaireTableComponent,
    EditAvanceSalaireDialogBox,
    PrimeAddDialogBox,
    PrimeDetailComponent,
    PrimeTableComponent,
    EditPrimeDialogBox,
    PenaliteDetailComponent,
    PenaliteTableComponent,
    PenaliteAddDialogBox,
    EditPenaliteDialogBox,
    HeureSuppDetailComponent,
    HeureSuppTableComponent,
    HeureSuppAddDialogBox,
    EditHeureSuppDialogBox,
    HoraireComponent,
    PrimeFilterComponent,
    PenaliteFilterComponent,
    HeureSuppFilterComponent,
    AvanceSalaireFilterComponent,
    PerformencesComponent,
    ArchivesComponent, 
    StatutsPaieComponent,
    ListPaimentsComponent,
    PaieViewComponent,
    RelevePaieTableComponent,
    FichePaieComponent,
    BulletinPaieComponent,
    PenaliteSAddDialogBox,
    NumberFormatPipe, 
    RelevePaieComponent, 
    PerformenceViewComponent,
    PerformenceAddDialogBox,
    HospitaliteComponent,
    TravailComponent,
    PonctualiteComponent,
    EditPerformenceDialogBox,
    PerformenceTableComponent, 
    PerformencePieComponent, 
    PerformencePieYearComponent,
    PerformencePieAllComponent,
    PresEntrepriseComponent,
    DashAllMoisComponent,
    DashAllYearComponent,
    DashAllComponent,
    EmployesMoisComponent,
    EmployesYearComponent,
    EmployesAllComponent,
    FinanceAllComponent,
    FinanceYearComponent,
    FinanceMonthComponent,
    PresenceMonthComponent,
    PresenceYearComponent,
    PresenceAllComponent,
    AutreAllComponent,
    AutreMonthComponent,
    AutreYearComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
    }),
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    QRCodeModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    provideAnimations(), // required animations providers
    provideToastr(),
    NumberFormatPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
