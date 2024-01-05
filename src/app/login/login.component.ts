import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData: any;

  constructor(private _builder: FormBuilder, private _auth: AuthService, private _toastr: ToastrService, private _router: Router) {
  }

  loginFrom = this._builder.group({
    id: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required)

  })

  login() {


    if (this.loginFrom.valid) {
      this._auth.getByCode(this.loginFrom.value.id).subscribe(res => {
        this.userData = res;
        if(this.userData.password === this.loginFrom.value.password){
          if(this.userData.isActive){
            sessionStorage.setItem('username', this.userData.id)
            sessionStorage.setItem('userrole', this.userData.role)
            this._router.navigate([''])
          }else{
            this._toastr.error("Please contact admin","Inactive User")
          }
        }else{
          this._toastr.error("Please check and Retry!", "Invalid credentials!")
        }
      })
    } else {
      this._toastr.warning("please enter valid data")
    }
  }

}

