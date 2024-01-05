import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _builder: FormBuilder, private _toastr:ToastrService, private _auth: AuthService, private _router:Router){

  }

  registerFrom = this._builder.group({
    id:this._builder.control('', Validators.compose([Validators.required,Validators.minLength(5)])),
    fullName:this._builder.control(''),
    password:this._builder.control('', Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!%*?&])[A-Za-z\d$!%*?&].{8,}')])),
    email:this._builder.control('', Validators.compose([Validators.required,Validators.email])),
    gender:this._builder.control('male'),
    role:this._builder.control(''),
    isActive:this._builder.control(false)

  })

  registration(){
    console.log(this.registerFrom.value);


    if(this.registerFrom.valid){
      this._auth.register(this.registerFrom.value).subscribe(res=>{
        this._toastr.success('Please contact admin for enable access','Register Successfully')
        this._router.navigate(['login'])
      })
    }else{
      this._toastr.warning("please enter valid data")
    }
  }
}
