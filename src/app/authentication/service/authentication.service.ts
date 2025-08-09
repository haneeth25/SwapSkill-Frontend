import { Injectable } from '@angular/core';
import { LoginResponse } from '../interface/login-response';
import { SignupResponse } from '../interface/signup-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

    login(username:string,password:string){
      let loginCredintials  = {
        "username":username,
        "password":password
      }
      return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`,loginCredintials);
    }

    signup(username:string,email:string,password:string){
      let signupCredintials = {
        "username":username,
        "email":email,
        "password":password
      }
      return this.http.post<SignupResponse>(`${environment.apiBaseUrl}/auth/signup`,signupCredintials);

    }
}
