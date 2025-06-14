import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  dashboardData(){
    const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
  });
    return this.http.get<{ message: string }>(`${environment.apiBaseUrl}/dashboard`,{headers})
  }

}
