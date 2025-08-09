import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProfileCreationService } from './service/profile-creation.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";

@Component({
  selector: 'app-profile-creation',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule, FormsModule, RatingModule, NavbarComponent, ProgressSpinnerComponent],
  templateUrl: './profile-creation.component.html',
  styleUrl: './profile-creation.component.css',
  providers:[]
})
export class ProfileCreationComponent {

   // Form fields
  ProfilePhotoFile : File | null = null;           // Stores uploaded profile image file
  isProfilePhotoUploaded = false;                  // Flag to show if profile photo uploaded
  profilePhotoName : string = "";                  // Stores name of uploaded photo
  profilePhotoBase64String : string|null = null;   // Base64 version of photo for preview/storage
  fullname:string="";                              // Full Name input
  currentJob:string="";                            // Current Job input
  bio:string="";                                   // Bio input
  txt:string="";                                   // Temporary skill input text
  skillsList:Map<string,number> =new Map();        // Stores skill names with rating
  value=0;                                          // Form completion percentage
  day:string="";                                   // Temporary day selection
  availability:string[]=[];                        // List of available days

  // Profile creation response variables
  profileCreationResponse:String="";               // Backend response for creation
  profileCreationErrorMsg:string="";               // Error message if profile creation fails
  progressSpiner:boolean = false;


  constructor(private profileCreationService : ProfileCreationService,private router:Router){}

  // Handles profile photo selection, stores base64 string for preview
  onProfilePhotoSelected(event: Event) {
    const input =  event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.ProfilePhotoFile = input.files[0];
      this.isProfilePhotoUploaded = true;
      this.calculateProgress();
      this.profilePhotoName = this.ProfilePhotoFile.name;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.ProfilePhotoFile);
      fileReader.onload = () =>{
        this.profilePhotoBase64String = fileReader.result as string;
        localStorage.setItem('profilePhoto',this.profilePhotoBase64String);
      }  
    }
  }

  // Deletes uploaded profile photo
  deletePhoto(){
    this.ProfilePhotoFile=null;
    this.isProfilePhotoUploaded=false;
    this.profilePhotoName="";
    this.profilePhotoBase64String=null;
    this.calculateProgress();
  }

  // Adds a new skill to the list if not already present
  onSkillChange(){
    const skillName=this.txt.trim();
    if(skillName && !this.skillsList.has(skillName.toLowerCase())) {
      this.skillsList.set(skillName,0); //Deafult rating=0
      this.calculateProgress();
    }
    this.txt='';
  }

  // Removes a skill from the list
  removeSkill(skillRemove:string){
    this.skillsList.delete(skillRemove);
    this.calculateProgress();
  }

  // returns skill names as array
  getSkillNames(): string[] {
    return Array.from(this.skillsList.keys());
  }

  // Get current rating of a skill
  getSkillRating(skillName: string): number {
    return this.skillsList.get(skillName) || 0;
  }

  // Update rating for a skill
  updateSkillRating(skillName: string, rating: number): void {
    this.skillsList.set(skillName, rating);
  }

  // Adds selected availability day to list if not already present
  addDays() {
    if (this.day && !this.availability.includes(this.day)) {
      this.availability.push(this.day);
      this.day = ""; 
      this.calculateProgress();
    }
  }

  // Removes a selected availability day
  removeDay(dayToRemove: string) {
    this.availability = this.availability.filter(d => d !== dayToRemove);
    this.calculateProgress();
  }

  // Calculates progress percentage based on how many form sections are filled
  calculateProgress(){
    const sections=[
      this.fullname.trim()!=="",
      this.isProfilePhotoUploaded,
      this.currentJob.trim()!=="",
      this.bio.trim()!=="",
      this.skillsList.size>0,
      this.availability.length>0,
    ];

    const completedCount=sections.filter(Boolean).length;//fields that aren't empty will be like true and they are added to a list and the list's length is calculated
    const totalSections=sections.length;
    const progress=(completedCount/totalSections)*100;
    this.value=Math.round(progress); 
  }


  // Creates the profile by sending data to backend service
  createProfile() {
    const skillObj:{[key: string]:number}={};
    this.skillsList.forEach((rating, name)=>skillObj[name] = rating);

    const profileData={
      fullname:this.fullname,
      currentJob:this.currentJob,
      bio:this.bio,
      skills:skillObj,
      profilePhotoName:this.profilePhotoName,
      availability: this.availability
    };

    this.profileCreationResponse="";
    this.profileCreationErrorMsg="";
    
    // Calls service to send profile data and image to backend
    this.progressSpiner = true 
    this.profileCreationService.createProfile(this.profilePhotoBase64String,this.currentJob,this.bio,this.skillsList,this.availability).subscribe(data=>{
      this.profileCreationResponse=data;

      // Handling responses
      if(this.profileCreationResponse === "User doesn't exist"){
        this.profileCreationErrorMsg="Please Create an Account";

      }
      else if(this.profileCreationResponse === "Done"){
        this.router.navigate(['/dashboard']);
      }
      this.progressSpiner = false;
    },error => {
      this.progressSpiner = false;
    })
    
    
  }
}
