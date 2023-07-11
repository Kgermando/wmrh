import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


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
import { TotalStatsComponent } from './dashboard/total-stats/total-stats.component';
import { PresenceStatusComponent } from './dashboard/presence-status/presence-status.component';
import { ProgressionPaieComponent } from './dashboard/progression-paie/progression-paie.component';
import { PrimeStatsComponent } from './dashboard/prime-stats/prime-stats.component';
import { PenaliteStatsComponent } from './dashboard/penalite-stats/penalite-stats.component';
import { ImpotStatsComponent } from './dashboard/impot-stats/impot-stats.component';
import { SyndicatStatsComponent } from './dashboard/syndicat-stats/syndicat-stats.component';
import { PresenceStatsComponent } from './dashboard/presence-stats/presence-stats.component';
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
import { PresenceFormComponent, PresenceSortieDialogBox } from './presences/pointage/presence-form/presence-form.component';
import { PresenceCalendarComponent } from './presences/pointage/presence-calendar/presence-calendar.component';
import { PresencePieMonthComponent } from './presences/pointage/presences-pie/presence-pie-month/presence-pie-month.component';
import { PresencePieYearComponent } from './presences/pointage/presences-pie/presence-pie-year/presence-pie-year.component';
import { PresencePieAllComponent } from './presences/pointage/presences-pie/presence-pie-all/presence-pie-all.component';
import { PresencesPieComponent } from './presences/pointage/presences-pie/presences-pie.component'; 
import { PointageTableComponent } from './presences/pointage/pointage-table/pointage-table.component';
import { RegistrePresenceComponent } from './presences/registre-presence/registre-presence.component';


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
    TotalStatsComponent, 
    PresenceStatusComponent, 
    ProgressionPaieComponent, 
    PrimeStatsComponent, 
    PenaliteStatsComponent, 
    ImpotStatsComponent, 
    SyndicatStatsComponent, 
    PresenceStatsComponent,
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
    PresenceSortieDialogBox, 
    PointageTableComponent,
    RegistrePresenceComponent
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
