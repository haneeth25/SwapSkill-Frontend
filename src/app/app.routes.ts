import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:"",
        component:AuthenticationComponent
    },
    {
        path : "dashboard",
        component:DashboardComponent
    }
];
