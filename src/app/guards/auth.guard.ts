import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs/Rx";
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
   
    if (this.authService.loggedIn()) {
      console.log(true);
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log(false);
      return false;
    }
  }
}