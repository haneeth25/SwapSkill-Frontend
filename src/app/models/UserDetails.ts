import { KeyValueMapper } from "./KeyValueMapper";

export interface UserDetails{
    fullName:string;
    profilePhoto:string | null;
    currentJob:string;
    bio:string;
    skillsAndRating:KeyValueMapper<string,number>[];
    availableDays:string[];
    jwtToken:string;
}