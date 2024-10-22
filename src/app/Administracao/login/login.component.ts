import { CommonModule } from '@angular/common';
import { AuthService } from './../../../AuthService';
import { Component, OnInit, Input, AfterViewInit, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { MenuNavComponent } from '../../Components/menu-nav/menu-nav.component';
import { SignInInput } from 'aws-amplify/auth';
import { LoginService } from '../../../Login.Service';
import { CorpoLoginComponent } from "../corpo-login/corpo-login.component";
import { After } from 'v8';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_8KkHocSfT',
      userPoolClientId: '5rej1r2d415a0est3q5a3vtt9p',
    }
  },
});

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, MenuNavComponent, CommonModule, CorpoLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };
}
