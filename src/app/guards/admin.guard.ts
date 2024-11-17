import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
      if (this.authenticationService.isLoggedIn()) {

        if (this.authenticationService.isAdmin()) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }
      this.router.navigate(['/home']);
      return false;
    }
};
