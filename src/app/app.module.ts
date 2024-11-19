import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './page-components/home-page-components/home-page/home-page.component';
import { HeaderComponent } from './page-components/page-structure/header/header.component';
import { FooterComponent } from './page-components/page-structure/footer/footer.component';
import { BannerComponent } from './page-components/home-page-components/banner/banner.component';
import { FeaturesComponent } from './page-components/home-page-components/features/features.component';

import { HttpClientModule } from '@angular/common/http';

import { PlantsMModule } from './plants-m/plants-m.module';
import { MembershipComponent } from './page-components/home-page-components/membership/membership.component';
import { SearchPageComponent } from './page-components/search-page-components/search-page/search-page.component';
import { FormLogInComponent } from './form-components/form-log-in/form-log-in.component';
import { FromRegisterComponent } from './form-components/from-register/from-register.component';
import { FormMembershipComponent } from './form-components/form-membership/form-membership.component';
import { FilterFormComponent } from './form-components/filter-form/filter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantInformationPageComponent } from './page-components/plant-information-page-components/plant-information-page/plant-information-page.component';
import { PlantInformationSourcesComponent } from './page-components/plant-information-page-components/plant-information-sources/plant-information-sources.component';
import { FavoritesPageComponent } from './page-components/favorite-page-components/favorites-page/favorites-page.component';
import { AdminViewComponent } from './page-components/admin-page-components/admin-view/admin-view.component';
import { ProfileComponent } from './page-components/profile-page-components/profile/profile.component';
import { TimerAlertComponent } from './page-components/timer-components/timer-alert/timer-alert.component';
import { UserViewComponent } from './page-components/user-view/user-view.component';
import { ToastNotificationsComponent } from './alerts/toast-notifications/toast-notifications.component';
import { NoteFormComponent } from './form-components/note-form/note-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturesComponent,
    MembershipComponent,
    SearchPageComponent,
    FormLogInComponent,
    FromRegisterComponent,
    FormMembershipComponent,
    FilterFormComponent,
    PlantInformationPageComponent,
    PlantInformationSourcesComponent,
    FavoritesPageComponent,
    AdminViewComponent,
    ProfileComponent,
    TimerAlertComponent,
    UserViewComponent,
    ToastNotificationsComponent,
    NoteFormComponent,
    ],  
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PlantsMModule ,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
