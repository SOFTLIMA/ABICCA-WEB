import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../AuthService';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../Login.Service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent implements OnInit{

  sair = false;

  constructor(private authService: AuthService, private loginService : LoginService){}

  async ngOnInit(): Promise<void> {
    this.loginService.value.subscribe(
      value => this.sair = value
    );
    await this.Validar();
  }

  async Validar(): Promise<void> {

    let session = await this.authService.getCurrentSession();

    if (session?.idToken?.toString() != undefined){
      // console.log(session?.idToken?.toString());
      this.loginService.changeValue(true);
    }
    else{
      this.loginService.changeValue(false);
    }
  }

  Sair():void {
    this.authService.signOut();
    this.loginService.changeValue(false);
  }
}
