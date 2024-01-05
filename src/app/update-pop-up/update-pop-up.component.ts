import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-pop-up',
  templateUrl: './update-pop-up.component.html',
  styleUrls: ['./update-pop-up.component.css']
})
export class UpdatePopUpComponent implements OnInit {

  rolelist: any;
  editData: any;

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toastr: ToastrService,
    private _matDialog:MatDialogRef<UpdatePopUpComponent>
    ) {

  }

  ngOnInit(): void {
    this._auth.getAllRole().subscribe(res => {
      this.rolelist = res
    })

    if (this.data.usercode != null && this.data.usercode != '') {
      this._auth.getByCode(this.data.usercode).subscribe(res => {
        this.editData = res
        this.registerFrom.setValue({
          id: this.editData.id,
          fullName: this.editData.fullName,
          password: this.editData.password,
          email: this.editData.email,
          gender: this.editData.gender,
          role: this.editData.role,
          isActive: this.editData.isActive
        })
      })
    }
  }

  registerFrom = this._builder.group({
    id: this._builder.control(''),
    fullName: this._builder.control(''),
    password: this._builder.control(''),
    email: this._builder.control(''),
    gender: this._builder.control('male'),
    role: this._builder.control('', Validators.required),
    isActive: this._builder.control('false')

  })

  updateUser() {
    if(this.registerFrom.valid){
      this._auth.update(this.registerFrom.value.id, this.registerFrom.value).subscribe(res =>{
        this._toastr.success('Data Updated Successfully...')
        this._matDialog.close();
      })
    }else{
      this._toastr.warning('Please Select Role')
    }
  }

}
