import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Import the configuration object from app.config.ts
import { AppComponent } from './app/app.component'; // Import the root component of your application

// Bootstrapping the Angular application with the provided configuration from appConfig
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Handling any errors that might occur during bootstrapping
