import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const _authService = inject(AuthService)
  const router = inject(Router)
  const toastr = inject(ToastrService)

  if(_authService.IsLogged()){
    return true;
  }else{
    router.navigate(['login'])
    return false;
  }



};


