import { Component } from '@angular/core';
import { Post } from '../../interfaces/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/postService/post.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.mode';
import { UserDataService } from '../../services/userDataService/user-data.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  enteredTitle = '';
  enteredContent = '';
  mode = 'create';
  public post!: Post;
  imagePreview:string;

  form!:FormGroup;
  userData:User;



  constructor(public postService: PostService, public route:ActivatedRoute,private userDataService:UserDataService){}
  ngOnInit(): void {
    this.validatFome();
    this.getUserData();
    this.checkMode();
  }

  checkMode() {
    this.route.params.subscribe(params => {
      if (params['postId']) {
        this.mode = 'edit'; // Set mode to edit
        console.log("Edit mode");
        this.fetchAndPopulateData()
      } else {
        
        this.mode = 'create'; // Set mode to create
      }
    });
  }

  fetchAndPopulateData(){
    this.post = this.postService.getSelectedPost();
    this.imagePreview = this.post.image; 

    // Patch the form with the post data
    this.form.patchValue({
      title: this.post.title,
      content: this.post.content,
      image: this.post.image
    });

  }

  validatFome(){
    this.form = new FormGroup({
      'title':new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'content': new FormControl(null,{validators:[Validators.required,Validators.minLength(4)]}),
      'image': new FormControl(null,{validators:[Validators.required]})
    })
  }
  getUserData(){
    this.userData = this.userDataService.getUserData()
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return; // Exit if no file is selected

    console.log("Image file picked", file);

    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    
    const reader = new FileReader();
    reader.onload = () => {      
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if(this.form.invalid) return;
    if(this.mode === 'create'){
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.userData._id
      );
    }else{
      this.postService.updatePost(
        this.post._id,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.userData._id
      );
    }
  }
}
