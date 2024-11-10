import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { PlantInformationPageComponent } from './plant-information-page/plant-information-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ProfileComponent } from './ProfileComponents/profile/profile.component';

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
