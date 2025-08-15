import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../../models/UserDetails';
import { environment } from '../../../environments/environment';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

    constructor(private http:HttpClient) { }

  getUserDetails(){
    return this.http.get<UserDetails>(`${environment.apiBaseUrl}/userDetails`).pipe(delay(5000));
  }
  updateUserDetails(userDetails:UserDetails){
    return this.http.post<UserDetails>(`${environment.apiBaseUrl}/updateUserDetails`,userDetails)
  }
}
