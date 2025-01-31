import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './page-components/home-page-components/home-page/home-page.component';
import { SearchPageComponent } from './page-components/search-page-components/search-page/search-page.component';
import { FormLogInComponent } from './form-components/form-log-in/form-log-in.component';
import { PlantInformationPageComponent } from './page-components/plant-information-page-components/plant-information-page/plant-information-page.component';
import { FavoritesPageComponent } from './page-components/favorite-page-components/favorites-page/favorites-page.component';
import { AdminViewComponent } from './page-components/admin-page-components/admin-view/admin-view.component';
import { ProfileComponent } from './page-components/profile-page-components/profile/profile.component';
import { UserViewComponent } from './page-components/user-view/user-view.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ForoPageComponent } from './page-components/foro-page-components/foro-page/foro-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, 
  { path: 'search', component: SearchPageComponent }, 
  { path: 'login', component: FormLogInComponent}, 
  { path: 'plant/:id', component: PlantInformationPageComponent},
  { path: 'fav', component: FavoritesPageComponent, canActivate: [UserGuard]},
  { path: 'foro', component: ForoPageComponent, canActivate: [UserGuard]},
  { path: 'admin', component: AdminViewComponent, canActivate: [AdminGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  { path: 'view/:id', component: UserViewComponent, canActivate: [AdminGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
