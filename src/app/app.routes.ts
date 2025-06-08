import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';

export const routes: Routes = [
    {
        path:"",
        component:AuthenticationComponent
    },
    {
        path : "dashboard",
        component:DashboardComponent,
    },
    {
        path : "profilecreation",
        component:ProfileCreationComponent
    }
];
