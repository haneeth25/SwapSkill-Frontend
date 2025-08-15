import { Component } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  message:string="";
  jwtToken:string|null="";

  constructor(private dashboardService:DashboardService){

  }

  ngOnInit():void{
    this.dashboardService.dashboardData().subscribe(data => {
      this.message = data.message;
      this.jwtToken = localStorage.getItem("jwtToken");
    })
  }
}
