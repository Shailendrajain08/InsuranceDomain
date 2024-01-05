import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  apiUrl = 'http://localhost:3000/user';

  getAll(){
    return this._http.get(this.apiUrl);
  }

  getByCode(code:any):Observable<any>{
    return this._http.get(this.apiUrl+'/'+code)
  }

  register(data:any): Observable<any>{

    return this._http.post(this.apiUrl, data)
  }

  update(data:any, id:any){
    return this._http.put(this.apiUrl+'/'+data, id)
  }

  IsLogged(){
    return sessionStorage.getItem('username')!==null;
  }

  getUserRoll(){
    return sessionStorage.getItem('username')!==null?sessionStorage.getItem('userrole')?.toString():'';
  }
}
