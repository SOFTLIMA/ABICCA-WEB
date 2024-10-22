import { LoginService } from './../../../Login.Service';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ComponentRef } from '@angular/core';
import { MenuNavComponent } from '../../Components/menu-nav/menu-nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corpo-login',
  standalone: true,
  imports: [MenuNavComponent],
  templateUrl: './corpo-login.component.html',
  styleUrl: './corpo-login.component.css'
})
export class CorpoLoginComponent implements OnInit{

  constructor(private loginService : LoginService){}


  ngOnInit(): void {
    this.loginService.changeValue(true);
  }
}
