import { AuthService } from './../../../AuthService';
import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_xxxxx',
      userPoolClientId: '71h7gnxxxxxxxxx'
    }
  }
});

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
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
