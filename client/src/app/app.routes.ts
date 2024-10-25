import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { OtpComponent } from './pages/otp/otp.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'',component:LandingComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'verify',component:OtpComponent},
    {path:'home',component:HomeComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'},
];