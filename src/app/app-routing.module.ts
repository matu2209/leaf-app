import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './page-components/home-page-components/home-page/home-page.component';
import { SearchPageComponent } from './page-components/search-page-components/search-page/search-page.component';
import { FormLogInComponent } from './form-components/form-log-in/form-log-in.component';
import { PlantInformationPageComponent } from './page-components/plant-information-page-components/plant-information-page/plant-information-page.component';
import { FavoritesPageComponent } from './page-components/favorite-page-components/favorites-page/favorites-page.component';
import { AdminViewComponent } from './page-components/admin-page-components/admin-view/admin-view.component';
import { ProfileComponent } from './page-components/profile-page-components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, 
  { path: 'search', component: SearchPageComponent }, 
  { path: 'login', component: FormLogInComponent}, 
  { path: 'plant/:id', component: PlantInformationPageComponent},
  { path: 'fav', component: FavoritesPageComponent},
  { path: 'admin', component: AdminViewComponent},
  { path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
