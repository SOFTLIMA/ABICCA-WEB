import { Component, type OnInit } from "@angular/core"
import type { DomSanitizer } from "@angular/platform-browser"
import { RouterLink, RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent implements OnInit {
  youtubeUrl =
    "https://www.youtube.com/watch?v=hv9oXhhOCWshttps://www.youtube.com/embed/hv9oXhhOCWs?si=UAl7QDq6I043NfIK"

  constructor() {}

  ngOnInit(): void {
    // Any initialization code if needed
  }
}
