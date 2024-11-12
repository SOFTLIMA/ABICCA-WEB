import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient()]
};


export const awsConfig = {
  CognitoId: "cognito-idp.us-east-2.amazonaws.com/us-east-2_8KkHocSfT",
  userCognito: {
    region: 'us-east-2',
    clientConfig: {region: 'us-east-2'},
    identityPoolId: 'us-east-2:92bb552d-95a1-4b56-8160-4ed4864bb054',
  }
};


