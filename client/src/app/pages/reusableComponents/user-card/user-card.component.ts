import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() name!: string;
  @Input() profileImage!: string;
  @Input() description!: string;

  viewProfile() {
    console.log(`${this.name}'s profile clicked!`);
    // Add navigation or any other action here
  }
  
}
