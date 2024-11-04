import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/postService/post.service';
import { MatCardModule } from '@angular/material/card';
import { PostCardComponent } from '../reusableComponents/post-card/post-card.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule,MatCardModule,PostCardComponent,HeaderComponent,ToastModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
  providers:[MessageService]
})
export class UserPostsComponent implements OnInit {
  posts:Post[];

  constructor(private postService:PostService, private router:Router,private messageService: MessageService){}

  ngOnInit(){
    this.posts = this.postService.getPosts()
  }

  goToPostDetails(post:Post): void {
    this.postService.setSelectedPost(post);
    this.router.navigate(['/postPage']);
  }
  editPost(post:Post) {
    console.log(post);
    this.postService.setSelectedPost(post)
    
    this.router.navigate(['/addPost', post._id]);
  }

  deletePost(postId: string) {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this post?');
  
    // If the user confirms deletion, proceed with the delete operation
    if (confirmed) {
      this.postService.deletePost(postId).subscribe({
        next: (response) => {
          // Remove the post from the local posts array after successful deletion
          this.posts = this.posts.filter(post => post._id !== postId);
          console.log('Post deleted:', postId);
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.message });
        },
        error: (err) => {
          console.error('Error deleting post:', err);
        }
      });
    } else {
      // If the user cancels, log or handle as needed
      console.log('Post deletion canceled by user.');
    }
  }
  
}
