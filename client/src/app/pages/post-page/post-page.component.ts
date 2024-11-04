import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../services/postService/post.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatToolbarModule,MatIconModule],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent {
  post: Post;

constructor(private postService:PostService, private location: Location){}
  ngOnInit(): void {
    this.post = this.postService.getSelectedPost()
  }

  goBack(){
    this.location.back();
  }
}
