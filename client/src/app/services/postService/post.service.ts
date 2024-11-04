import { APP_ID, Injectable } from '@angular/core';
import { Post } from '../../interfaces/post';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/apiResponse.mode';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public baseUrl = 'http://localhost:8000';

  private selectedPost: Post;
  private posts: Post[];

  constructor( private http:HttpClient, private router:Router){}


  addPost(title:string,content:string,image:File,userId:string){
    const postData = new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image);
    postData.append("userId",userId);

    this.http.post<{message:string,post:Post}>(`${this.baseUrl}/api/v1/addPost`, postData)
    .subscribe((resData)=>{
      this.router.navigate(['/home'])
    })
  }

  updatePost(postId:string,title:string,content:string,image:File,userId:string){
    const postData = new FormData();
    postData.append("postId",postId);
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image);
    postData.append("userId",userId);

    this.http.post<ApiResponse>(`${this.baseUrl}/api/v1/updatePost`, postData)
    .subscribe((res)=>{
      const index = this.posts.findIndex(p => p._id === postId);
      if (index > -1) {
        this.posts[index] = res.data; // Update the post with new data
      }
      this.router.navigate(['/userPosts']);
    })
  }

  fetchPost():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/api/v1/fetchPosts`);
  }
  deletePost(postId:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/api/v1/deletePost/${postId}`);
    
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
  }

  getPosts() {
    return this.posts;
  }

  setSelectedPost(post: Post) {
    this.selectedPost = post;
  }

  getSelectedPost() {
    return this.selectedPost;
  }

}
