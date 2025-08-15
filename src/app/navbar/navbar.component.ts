import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router:Router){}

  isMenuOpen:boolean = false;
  isLogin:boolean =false;
  isProfileDropdownOpen:boolean = false;
  profilePhotoBase64String:string|null=null;
  // Toggles the visibility of the hamburger menu (side nav)
  toggleMenu() {
    this.isMenuOpen=!this.isMenuOpen;
  }

  // Toggles visibility of the profile dropdown menu
  toggleProfileDropdown(){
    this.isProfileDropdownOpen=!this.isProfileDropdownOpen;
  }
  ngOnInit():void{
      try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem("profilePhoto")) {
        this.profilePhotoBase64String = localStorage.getItem("profilePhoto");
      } else {
        this.profilePhotoBase64String = environment.defaultProfilephoto;
      }

      // Check if user is logged in by verifying token in localStorage
      if (localStorage.getItem("jwtToken")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    } else {
      // Fallback if not in browser
      this.profilePhotoBase64String = environment.defaultProfilephoto;
      this.isLogin = false;
    }
  } catch (error) {
    // Optionally log or handle error
  }
}
  onLogout() {
    // Remove token from localStorage and Update login and dropdown states
    if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("profilePhoto");
  }

  this.isLogin = false;
  this.isProfileDropdownOpen = false;

  // Navigate to the home page and reload the window
  if (typeof window !== 'undefined') {
    this.router.navigate(['']).then(() => {
      window.location.reload();
      });
    }
  }
}


