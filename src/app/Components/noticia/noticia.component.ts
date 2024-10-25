import { Component } from '@angular/core';
import { BlogComponent } from "./blog/blog.component";

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [BlogComponent],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {

}
