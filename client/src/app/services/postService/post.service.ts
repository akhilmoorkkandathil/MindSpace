import { Injectable } from '@angular/core';
import { Post } from '../../interfaces/post';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public baseUrl = 'http://localhost:8000'

  constructor( private http:HttpClient, private router:Router){}


  addPost(title:string,content:string,image:File){
    const postData = new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image);
    
    console.log("This is the post data in the addPost in servicer",title,content,image,postData);
    postData.forEach((value, key) => {
      console.log(key, value);
  });
    this.http.post<{message:string,post:Post}>(`${this.baseUrl}/api/v1/addPost`, postData)
    .subscribe((resData)=>{
      this.router.navigate(['/home'])
    })
  }
}
