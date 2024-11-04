import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor]) // Register the interceptor here
    ),
    provideAnimationsAsync(), provideAnimationsAsync()
    
  ]
};
