import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() image!: string;
}
