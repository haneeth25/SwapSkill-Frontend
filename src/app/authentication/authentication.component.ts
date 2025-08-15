import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from './service/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { error } from 'console';
import { PopupMessagesComponent } from "../popup-messages/popup-messages.component";


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CardModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, CommonModule, NavbarComponent, ProgressSpinnerComponent, PopupMessagesComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{
  loginUsername:string="";
  loginPassword:string="";
  signupUsername:string="";
  signupEmail:string="";
  signupassword:string="";
  jwtToken:string = "";
  loginFailed = false
  signupResponse : string = "";
  progressSpiner:boolean = false;
  messageType:string = "";
  displayMessage:boolean = false;
  message:string="";

  constructor(private authenticationService : AuthenticationService , private router : Router){

  }
  ngOnInit(): void {
    this.progressSpiner = false;
    this.displayMessage = false;
  }

  afterMessageHandled(){
    this.messageType = "";
    this.displayMessage = false;
    this.message="";
  }

  loginSubmit(){
    if (this.loginUsername && this.loginPassword){
      this.progressSpiner = true;
      this.authenticationService.login(this.loginUsername,this.loginPassword).subscribe(
        data => {
          this.jwtToken = data.jwtToken
          if (this.jwtToken !== "Invalid user") {
            this.loginFailed = false;
            localStorage.setItem("jwtToken", this.jwtToken);
            localStorage.setItem('profilePhoto',data.profilePhoto);
            this.router.navigate(['/dashboard'])
          } else {
            this.progressSpiner = false
            this.messageType = "error";
            this.displayMessage = true;
            this.message = "Invalid Credintials";
          }
        },
        error => {
          this.progressSpiner = false
          if (error.status === 0) {
            this.messageType = "error";
            this.displayMessage = true;
            this.message = "Unable to connect to server";
          } else if (error.status === 500) {
            // Server-side error
            this.messageType = "error";
            this.displayMessage = true;
            this.message = "Server error occurred. Please try again later.";
          }
        }
      )
    }
    else{
      this.progressSpiner = false
      this.messageType = "error";
      this.displayMessage = true;
      this.message = "Unknow error";
    }
  }
    signupSubmit(){
      this.signupResponse = "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(this.signupUsername && this.signupassword && this.signupEmail){
        if (!emailRegex.test(this.signupEmail)) {
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Please enter a valid email address";
          // this.signupFailed = true;
          // this.signupErrorMessage = "Please enter a valid email address";
          return;
        }
        this.progressSpiner = true;
        this.authenticationService.signup(this.signupUsername,this.signupEmail,this.signupassword).subscribe(data => {
          this.signupResponse = data.signupResponse;
          if(this.signupResponse === "User registerd"){
            this.loginUsername = this.signupUsername;
            this.loginPassword = this.signupassword;
            localStorage.setItem('jwtToken',data.jwtToken);
            this.router.navigate(['/profilecreation']);
          }else if (this.signupResponse === "Email exists"){
            this.progressSpiner = false;
            this.messageType = "warn";
            this.displayMessage = true;
            this.message = "Email already exists, Login with it";
            // this.signupFailed = true;
            // this.signupErrorMessage = "Email already exists, Login with it";
          }
          else{
            this.progressSpiner = false;
            this.messageType = "warn";
            this.displayMessage = true;
            this.message = "Username already exists, Try other username";
            // this.signupFailed = true;
            // this.signupErrorMessage = "Username already exists, Try other username";
          }
        },error => {
          this.progressSpiner = false
          if (error.status === 0) {
            this.messageType = "error";
            this.displayMessage = true;
            this.message = "Unable to connect to server";
          } else if (error.status === 500) {
            // Server-side error
            this.messageType = "error";
            this.displayMessage = true;
            this.message = "Server error occurred. Please try again later.";
          }
        })
      }
      else{
        this.progressSpiner = false
        this.messageType = "error";
        this.displayMessage = true;
        this.message = "Unknow error";
      }
    }
}
