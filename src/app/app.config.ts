import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()) ]// Adăugăm activarea fetch pentru HttpClient]
};
