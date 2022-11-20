import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthServiceService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const role: any = await this.authService
        .getUserData(userId)
        .then((doc: any) => {
          if (doc.exists) {
            if (doc.data().role == 'User') {
              return true;
            } else {
              return false;
            }
          } else {
            console.log('No such document!');
            return false;
          }
        })
        .catch((err) => {});
      return true;
    } else {
      return false;
    }
  }
}
