import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordGuard implements CanActivate {
  constructor(private router: Router, private alertifyService: AlertifyService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('isFirstLogin') == 'true') {
      this.router.navigate(['/']);
      this.alertifyService.error('You have to change your default password!');
      return false;
    }
    return true;
  }
}
