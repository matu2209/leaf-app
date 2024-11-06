import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, 
  { path: 'search', component: SearchPageComponent }, 
  { path: 'login', component: FormLogInComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
