import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from './service/user-profile.service';
import { UserDetails } from '../models/UserDetails';
import { SkeletonModule } from 'primeng/skeleton';
import { PopupMessagesComponent } from "../popup-messages/popup-messages.component";
import { TokenService } from '../services/token-service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, InputTextModule, RatingModule, FormsModule, SkeletonModule, PopupMessagesComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  ProfilePhotoFile: File | null = null;           // Stores uploaded profile image file
  isProfilePhotoUploaded = false;                  // Flag to show if profile photo uploaded
  profilePhotoName: string = "";                  // Stores name of uploaded photo
  profilePhotoBase64String: string | null = null;   // Base64 version of photo for preview/storage
  isEditing: boolean = false;
  isProfileImgEditing: boolean = false;
  profileEditButtonText?: string;
  profilePhotoEditButtonText?: string;
  value: number = 2;
  count: number = 10;
  userDetails!: UserDetails;
  isDisplaySkeleton: boolean = true;
  isDisplayImgSkeleton: boolean = true;
  messageType: string = "";
  displayMessage: boolean = false;
  message: string = "";
  day : string = "";
  constructor(private userProfileService: UserProfileService,private tokenService:TokenService) {
    this.profilePhotoBase64String = environment.defaultProfilephoto;
  }
  ngOnInit(): void {
    if (this.isEditing) {
      this.profileEditButtonText = "Save"
    } else {
      this.profileEditButtonText = "Edit"
    }
    if (this.isProfileImgEditing) {
      this.profilePhotoEditButtonText = "Save"
    } else {
      this.profilePhotoEditButtonText = "Edit"
    }
    this.userProfileService.getUserDetails().subscribe(data => {
      this.userDetails = data;
      console.log(this.userDetails);
      if (data != null) {
        this.isDisplaySkeleton = false;
        this.isDisplayImgSkeleton = false;
      }
    }, error => {
      this.isDisplaySkeleton = true;
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

  afterMessageHandled() {
    this.messageType = "";
    this.displayMessage = false;
    this.message = "";
  }

  onEditOrSaveProfileClick() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileEditButtonText = "Save"
    } else {
      this.profileEditButtonText = "Edit"
      this.isDisplaySkeleton = true;
      this.userProfileService.updateUserDetails(this.userDetails).subscribe((data) => {
        this.userDetails = data;
        this.isDisplaySkeleton = false;
      }, error => {
        this.isDisplaySkeleton = true;
        if (error.status === 0) {
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Unable to connect to server";
        } else if (error.status === 500) {
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Server error occurred. Please try again later.";
        }else if(error.status === 403){
          this.tokenService.setToken(null);
          this.tokenService.setProfilePhoto(null);
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Session Expired , Please login";
      }
      });
    }
  }
  onEditOrSaveProfilePhotoClick() {
    this.isProfileImgEditing = !this.isProfileImgEditing;
    if (this.isProfileImgEditing) {
      this.profilePhotoEditButtonText = "Save"
    }
    else {
      this.profilePhotoEditButtonText = "Edit";
      this.isDisplayImgSkeleton = true;
      this.userProfileService.updateUserDetails(this.userDetails).subscribe((data) => {
        this.userDetails = data;
        this.isDisplayImgSkeleton = false;
      }, error => {
        this.isDisplaySkeleton = true;
        if (error.status === 0) {
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Unable to connect to server";
        } else if (error.status === 500) {
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Server error occurred. Please try again later.";
        } else if(error.status === 403){
          this.tokenService.setToken(null);
          this.tokenService.setProfilePhoto(null);
          this.messageType = "error";
          this.displayMessage = true;
          this.message = "Session Expired , Please login";
      }
      });
    }
  }
  onProfilePhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.ProfilePhotoFile = input.files[0];
      this.isProfilePhotoUploaded = true;
      this.profilePhotoName = this.ProfilePhotoFile.name;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.ProfilePhotoFile);
      fileReader.onload = () => {
        this.profilePhotoBase64String = fileReader.result as string;
        this.tokenService.setProfilePhoto(this.profilePhotoBase64String)
      }
    }
  }
  addDays(){
    if(!this.userDetails.availableDays.includes(this.day)){
      this.userDetails.availableDays.push(this.day);
    }
  }
  removeDay(index:number){
    console.log(this.userDetails.availableDays);
    this.userDetails.availableDays.splice(index,1);
    console.log(this.userDetails.availableDays);
  }

}
