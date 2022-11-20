import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

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
            if (doc.data().role == 'Admin') {
              return true;
            } else {
              return false;
            }
          } else {
            console.log('No such document!');
            return false;
          }
        })
        .catch((err) => {
        });
        return true;
    } else {
      return false;
    }
  }
}
