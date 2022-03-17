import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate() {
      const token = localStorage.getItem("token");
      if(token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }
}
