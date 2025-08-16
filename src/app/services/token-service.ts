import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private jwtTokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('jwtToken'));
    jwtToken$ = this.jwtTokenSubject.asObservable();
    private profilePhotoSubject = new BehaviorSubject<string | null>(localStorage.getItem("profilePhoto"));
    profilePhoto$ = this.profilePhotoSubject.asObservable();

    setToken(token: string | null) {
        if (token) {
            localStorage.setItem('jwtToken', token);
        } else {
            localStorage.removeItem('jwtToken');
        }
        this.jwtTokenSubject.next(token);
    }
    getToken(){
        const token = localStorage.getItem('jwtToken')
        return token;
    }
    setProfilePhoto(profilePhoto:any){
        if(profilePhoto){
            localStorage.setItem('profilePhoto',profilePhoto);
        }else{
            localStorage.removeItem('profilePhoto')
        }
        this.profilePhotoSubject.next(profilePhoto)
    }
    getProfilePhoto(){
        const profilePhoto = localStorage.getItem('profilePhoto');
        return profilePhoto
    }
}