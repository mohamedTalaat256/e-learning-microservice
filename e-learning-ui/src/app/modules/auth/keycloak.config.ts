import { provideKeycloak,
  createInterceptorCondition, withAutoRefreshToken, AutoRefreshTokenService,
  UserActivityService, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition } from 'keycloak-angular';

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
 urlPattern: /^(http:\/\/localhost:(8072|7080))(\/.*)?$/i

});
export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      realm: 'elearning',
      url: 'http://localhost:7080',
      clientId: 'elearning-web-app'
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      redirectUri: window.location.origin + '/admin'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition]
      }
    ]
  });
