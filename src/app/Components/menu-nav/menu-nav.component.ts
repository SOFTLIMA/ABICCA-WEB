import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent implements OnInit{

  sair : boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.sair = this.Validar();
  }

  Validar(): boolean {

    if (this.authService.getCurrentUser.length != 0){
      console.log("pass");
      return true;
    }
    return false;
  }

  Sair():void {
    this.authService.signOut();
    this.sair = false;
  }

}
