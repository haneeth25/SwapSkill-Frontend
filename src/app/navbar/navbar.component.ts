import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenService } from '../services/token-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router:Router,private tokenService:TokenService){}

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
    this.tokenService.jwtToken$.subscribe((token) => {
      if(token){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    })
    this.tokenService.profilePhoto$.subscribe((profilePhoto) => {
      if(profilePhoto){
        this.profilePhotoBase64String = profilePhoto;
      }
      else{
        this.profilePhotoBase64String = environment.defaultProfilephoto;
      }
    })
    // if(localStorage.getItem("profilePhoto")){
    //   this.profilePhotoBase64String=localStorage.getItem("profilePhoto");
    // }
    // else{
    //   this.profilePhotoBase64String=environment.defaultProfilephoto;
    // }
  }
  onLogout() {
    // Remove token from localStorage and Update login and dropdown states
    this.tokenService.setToken(null);
    this.tokenService.setProfilePhoto(null);
    this.isLogin=false;
    this.isProfileDropdownOpen = false;

    this.router.navigate(["authentication"])
  }
  onProfileClick(){
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    this.router.navigate(['/user-profile'])
  }
  onDashBoardSideMenuClick(){
    this.isMenuOpen = !this.isMenuOpen;
    this.router.navigate([""])
  }
}



