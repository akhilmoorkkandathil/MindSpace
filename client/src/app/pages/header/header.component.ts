import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router){}

  onButtonClick(){
    this.router.navigate(['/addPost'])
  }
  userPostPage(){
    this.router.navigate(['/userPosts'])
  }

  signOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

}
