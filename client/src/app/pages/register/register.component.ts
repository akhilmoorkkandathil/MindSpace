import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { User } from '../../models/user.mode';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {
  user: User = { userName: '',email:'', password: '' };
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}


  onRegister() {
    console.log("this.user in onRegister",this.user);
    
    this.authService.register(this.user).subscribe(
      (response) => {
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.message });
        // Handle successful login, e.g., store token and redirect
        this.router.navigate(['/verify'], { queryParams: { email: this.user.email } });
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: error.error.message});
      }
    );
  }
  login(){
    this.router.navigate(['/login']);
  }
}
