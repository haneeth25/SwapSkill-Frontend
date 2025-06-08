import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router:Router){}
  isMenuOpen = false;
  isLogin=false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit():void{
    if(localStorage.getItem("jwtToken")){
      this.isLogin=true;
    }
    else{
      this.isLogin=false;
    }
  }
  onLogout() {
    localStorage.removeItem("jwtToken");
    this.isLogin=false;
    this.router.navigate(['']).then(
      ()=>{
        console.log("Entering");
        window.location.reload();
      }
    );
  }
}



