import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideKeycloakAngular } from './modules/auth/keycloak.config';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from './core/interceptor/errorInterceptor.interceptor';
import { ToastModule } from 'primeng/toast';


export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor, errorInterceptor])),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideZonelessChangeDetection(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    importProvidersFrom(ToastModule),
    MessageService

  ]
};
