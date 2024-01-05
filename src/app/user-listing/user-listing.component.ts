import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopUpComponent } from '../update-pop-up/update-pop-up.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _auth: AuthService, private dialog:MatDialog){
    this.loadUser()
  }

  userList: any;

  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  dataSource:any;

  loadUser(){
    this._auth.getAll().subscribe(res=>{
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort = this.sort
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  UpdateUser(id:any){
    const popup = this.dialog.open(UpdatePopUpComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode:id
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.loadUser()

    })
  }

  openDialog(){
  }

}
