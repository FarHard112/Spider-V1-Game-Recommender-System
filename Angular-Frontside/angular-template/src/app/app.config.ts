import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule), // Ensure HttpClient is available for HTTP requests
    provideRouter(routes) // Configure routing based on the routes defined in app.routes.ts
  ]
};
