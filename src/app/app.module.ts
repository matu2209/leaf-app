import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { FeaturesComponent } from './features/features.component';

import { HttpClientModule } from '@angular/common/http';

import { PlantsMModule } from './plants-m/plants-m.module';
import { MembershipComponent } from './membership/membership.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { FromRegisterComponent } from './from-register/from-register.component';
import { FormMembershipComponent } from './form-membership/form-membership.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlantInformationPageComponent } from './plant-information-page/plant-information-page.component';
import { PlantInformationSourcesComponent } from './plant-information-sources/plant-information-sources.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { ProfileComponent } from './ProfileComponents/profile/profile.component';




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
    NotFoundComponent,
    PlantInformationPageComponent,
    PlantInformationSourcesComponent,
    FavoritesPageComponent,
    ProfileComponent,
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
