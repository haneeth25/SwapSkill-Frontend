import { Component } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { TokenService } from '../services/token-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dashBoardmessage:string="";
  jwtToken:string|null="";
  messageType: string = "";
  displayMessage: boolean = false;
  message: string = "";

  constructor(private dashboardService:DashboardService,private tokenService:TokenService){

  }

  ngOnInit():void{
    this.dashboardService.dashboardData().subscribe(data => {
      this.dashBoardmessage = data.message;
      this.jwtToken = this.tokenService.getToken();
    },error => {
      if (error.status === 0) {
        this.messageType = "error";
        this.displayMessage = true;
        this.message = "Unable to connect to server";
      } else if (error.status === 500) {
        // Server-side error
        this.messageType = "error";
        this.displayMessage = true;
        this.message = "Server error occurred. Please try again later.";
        // Optionally log error.error for more info
      }else if(error.status === 403){
        this.tokenService.setToken(null);
        this.tokenService.setProfilePhoto(null);
        this.messageType = "error";
        this.displayMessage = true;
        this.message = "Session Expired , Please login";
      }
    })
  }
}
