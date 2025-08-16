import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './AuthGuard';

export const routes: Routes = [
    {
        path:"authentication",
        component:AuthenticationComponent
    },
    {
        path : "",
        component:DashboardComponent,
        canActivate:[AuthGuard]
    },
    {
        path : "profilecreation",
        component:ProfileCreationComponent,
        canActivate:[AuthGuard]
    },
    {
        path : "user-profile",
        component:UserProfileComponent,
        canActivate:[AuthGuard]
    }
];
