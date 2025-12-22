import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {provideHttpClient} from '@angular/common/http';
import {APP_CONFIG} from './tokens/app-config.token';

fetch('/configs/appconfig.json')
  .then(res => res.json())
  .then(config => {
    bootstrapApplication(App, {
      ...appConfig, // keep Angular’s providers (router, http, etc.)
      providers: [
        provideHttpClient(),
        ...(appConfig.providers ?? []), // merge providers if present
        { provide: APP_CONFIG, useValue: config }
      ]
    });
  })
  .catch(err => console.error(err));
