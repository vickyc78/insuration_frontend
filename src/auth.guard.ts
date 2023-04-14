import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    var authToken = localStorage.getItem('userToken');
    if (
      authToken != null &&
      authToken != undefined &&
      authToken != 'undefined'
    ) {
      return true;
    } else {
      this.router.navigate(['/signin'], { replaceUrl: true });
      return false;
    }
  }
}
