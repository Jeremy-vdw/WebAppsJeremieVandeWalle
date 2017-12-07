import {Router, RouterStateSnapshot,  ActivatedRouteSnapshot,   CanActivate} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
    if (this.authService.user$.getValue()) {
      return true;
    }
        // Retain the attempted URL for redirection
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
  }
}