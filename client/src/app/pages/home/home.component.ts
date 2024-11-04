import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { PostService } from '../../services/postService/post.service';
import { Post } from '../../interfaces/post';
import { PostCardComponent } from '../reusableComponents/post-card/post-card.component';
import { UserCardComponent } from '../reusableComponents/user-card/user-card.component';
import { UserDataService } from '../../services/userDataService/user-data.service';
import { HeaderComponent } from '../header/header.component';


interface User {
  name: string;
  profileImage: string;
  description:string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatListModule,PostCardComponent,UserCardComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private postService:PostService, private userDataService:UserDataService){}
  posts: Post[]=[];

  ngOnInit(): void {
    this.fetchPostData()
  }

  fetchPostData() {
    this.postService.fetchPost().subscribe({
        next: (res) => {
          console.log("response in fetchpost ",res.data);
          console.log("UserData",this.userDataService.getUserData());
          
          this.postService.setPosts(res.data)
            this.posts = res.data; 
        },
        error: (err) => {
            console.error('Error fetching posts:', err); // Handle errors
        }
    });
}

  onButtonClick(){
    this.router.navigate(['/addPost'])
  }
  userPostPage(){
    this.router.navigate(['/userPosts'])
  }

  goToPostDetails(post:Post): void {
    this.postService.setSelectedPost(post);
    this.router.navigate(['/postPage']);
  }

  users: User[] = [
    {
      name: 'UserName1',
      profileImage: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg', // Replace with your image paths
      description:'sadfdasf'
    }
    // Add more users as needed
  ];
  signOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
