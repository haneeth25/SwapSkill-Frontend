import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // Makes this service available throughout the application
})
export class ProfileCreationService{
  // Inject HttpClient into the service for making HTTP requests
    constructor(private http:HttpClient){}

    createProfile(fullname:string,profilePhotoBase64String:string|null,currentJob:string,bio:string,skillsAndRating:Map<String,Number>,availableDays:String[]){

          // Convert the Map of skills and ratings to a plain object because the request body expects JSON
          const skillsObject = Object.fromEntries(skillsAndRating);


          // request body containing all profile details
          let profileDetails = {
            "fullName":fullname,
            "profilePhoto":profilePhotoBase64String,
            "currentJob":currentJob,
            "bio":bio,
            "skillsAndRating":skillsObject,
            "availableDays":availableDays
          }

          // Send POST request to the backend endpoint with the profile data
          return this.http.post(
            `${environment.apiBaseUrl}/profileCreation`,  // Backend API endpoint
            profileDetails,
            {
              responseType: 'text'                       // Expecting text response instead of JSON from backend
            }
          );

    }

}

