import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router, private http: HttpClient) { }

  CanActivate(): boolean{
    return true;
  }

  login(data: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/User/authenticate`, data);
  }

  register(data:any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/User/register`, data);
  }
  
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  signout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
