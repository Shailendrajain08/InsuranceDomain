import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-pop-up',
  templateUrl: './update-pop-up.component.html',
  styleUrls: ['./update-pop-up.component.css']
})
export class UpdatePopUpComponent implements OnInit {

  rolelist:any;

constructor(private _builder:FormBuilder, private _auth:AuthService){

}

ngOnInit(): void {
  this._auth.getAllRole().subscribe(res=>{
    this.rolelist = res
  })
}

  registerFrom = this._builder.group({
    id:this._builder.control(''),
    fullName:this._builder.control(''),
    password:this._builder.control(''),
    email:this._builder.control(''),
    gender:this._builder.control('male'),
    role:this._builder.control('', Validators.required),
    isActive:this._builder.control('false')

  })

  updateUser(){

  }

}
