import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private cookieService: CookieService, 
    private router: Router
  ) {}

  canActivate(): boolean {
  let hasToken = this.cookieService.check('user');

  if (hasToken) {
    return true;
  } else {
    this.router.navigate(['/']); 
    return false;
  }
}
}
