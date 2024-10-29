import { Component } from '@angular/core';
import { BlogComponent } from "./blog/blog.component";

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [BlogComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

}
