import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state) => {

  const _authService = inject(AuthService)
  const router = inject(Router)
  const toastr = inject(ToastrService)

  if (_authService.IsLogged()) {
    if (router.url.length > 0) {
      if (_authService.getUserRoll() == 'customer') {
        if (_authService.getUserRoll() == 'admin') {
          return true;
        } else {
          router.navigate(['']);
          toastr.warning('You dont have access.')
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true
    }
  } else {
    router.navigate(['login'])

    return false;
  }



};


