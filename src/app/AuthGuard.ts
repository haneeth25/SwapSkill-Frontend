import { Injectable } from "@angular/core";
import { CanActivate,Router } from "@angular/router";
import { TokenService } from "./services/token-service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private router:Router,private tokenService:TokenService){}

    canActivate():boolean {
        // const token = localStorage.getItem("jwtToken");
        const token = this.tokenService.getToken();
        if(token){
            return true;
        }
        else{
            this.router.navigate(["authentication"]);
            return false;
        }
    }
}