import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { OtpComponent } from './pages/otp/otp.component';
import { HomeComponent } from './pages/home/home.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';

export const routes: Routes = [
    // {path:'',component:LandingComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'verify',component:OtpComponent},
    {path:'home',component:HomeComponent},
    {path:'addPost',component:AddPostComponent},
    { path: 'addPost/:postId', component: AddPostComponent },
    { path: 'postPage', component: PostPageComponent },
    {path:'userPosts',component:UserPostsComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'},
];
