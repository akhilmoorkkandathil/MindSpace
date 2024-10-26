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
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  public post!: Post;
  imagePreview:string;

  form!:FormGroup;



  constructor(public postService: PostService, public route:ActivatedRoute){}
  ngOnInit(): void {
    this.form = new FormGroup({
      'title':new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'content': new FormControl(null,{validators:[Validators.required,Validators.minLength(4)]}),
      'image': new FormControl(null,{validators:[Validators.required]})
    })
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
        this.form.value.image
      );
    }else{
      // this.postService.updatePost(
      //   this.postId,
      //   this.form.value.title,
      //   this.form.value.content,
      //   this.form.value.image
      // );
    }
  }
}
