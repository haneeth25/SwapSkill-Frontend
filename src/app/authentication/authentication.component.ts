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
      if(this.signupUsername && this.signupassword && this.signupEmail){
        this.authenticationService.signup(this.signupUsername,this.signupEmail,this.signupassword).subscribe(data => {
          this.signupResponse = data.signupResponse;
          if(this.signupResponse = "User registerd"){
            this.loginUsername = this.signupUsername;
            this.loginPassword = this.signupassword;
            this.loginSubmit();
          }else{
            this.signupFailed = true;
          }
        })
      }
      else{
        this.signupFailed = true;
      }
    }
}
