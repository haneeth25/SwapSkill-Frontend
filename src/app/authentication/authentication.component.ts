import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from './service/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CardModule,FormsModule,InputTextModule,PasswordModule,ButtonModule,CommonModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  loginUsername:string="";
  loginPassword:string="";
  signupUsername:string="";
  signupEmail:string="";
  signupassword:string="";
  jwtToken:string = "";
  loginFailed = false
  signupFailed = false;
  signupResponse : string = "";
  signupErrorMessage : string = "";

  constructor(private authenticationService : AuthenticationService , private router : Router){


  }

  loginSubmit(){
    if (this.loginUsername && this.loginPassword){
      this.authenticationService.login(this.loginUsername,this.loginPassword).subscribe(
        data => {
          this.jwtToken = data.jwtToken
          if (this.jwtToken !== "Invalid user") {
            this.loginFailed = false;
            localStorage.setItem("jwtToken", this.jwtToken);
            console.log(localStorage.getItem("jwtToken"));
            this.router.navigate(['/dashboard'])
          } else {
            this.loginFailed = true;
          }
        }
      )
    }
    else{
      this.loginFailed = true
    }
  }
    signupSubmit(){
      this.signupResponse = "";
      this.signupErrorMessage = ""
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(this.signupUsername && this.signupassword && this.signupEmail){
        if (!emailRegex.test(this.signupEmail)) {
          this.signupFailed = true;
          this.signupErrorMessage = "Please enter a valid email address";
          return;
        }
        this.authenticationService.signup(this.signupUsername,this.signupEmail,this.signupassword).subscribe(data => {
          this.signupResponse = data.signupResponse;
          if(this.signupResponse === "User registerd"){
            this.signupFailed = false;
            this.loginUsername = this.signupUsername;
            this.loginPassword = this.signupassword;
            this.loginSubmit();
          }else if (this.signupResponse === "Email exists"){
            this.signupFailed = true;
            this.signupErrorMessage = "Email already exists, Login with it";
          }
          else{
            this.signupFailed = true;
            this.signupErrorMessage = "Username already exists, Try other username";
          }
        })
      }
      else{
        this.signupFailed = true;
        this.signupErrorMessage = "Invalid Credintials";
      }
    }
}
