import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-creation',
  standalone: true,
  imports: [CommonModule,ButtonModule,ProgressBarModule,FormsModule],
  templateUrl: './profile-creation.component.html',
  styleUrl: './profile-creation.component.css',
  providers:[]
})
export class ProfileCreationComponent {

  ProfilePhotoFile : File | null = null;
  isProfilePhotoUploaded = false;
  profilePhotoName : String = "";
  profilePhotoBase64String : String|null = null;

  text : String|null = null;

  value = 0;

  onProfilePhotoSelected(event: Event) {
    const input =  event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.ProfilePhotoFile = input.files[0];
      this.isProfilePhotoUploaded = true;
      this.profilePhotoName = this.ProfilePhotoFile.name;
      console.log('Selected file:', this.ProfilePhotoFile.name);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.ProfilePhotoFile);
      fileReader.onload = () =>{
        this.profilePhotoBase64String = fileReader.result as string;
      }
    }
  }

  deletePhoto() {
    this.ProfilePhotoFile = null;
    this.isProfilePhotoUploaded = false;
    this.profilePhotoName = "";
    this.profilePhotoBase64String = null;
    console.log("removed");
  }


}
