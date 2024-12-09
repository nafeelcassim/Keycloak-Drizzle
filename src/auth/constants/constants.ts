export const KeyCloakConfig = {
  baseUrl: 'http://localhost:8080',
  grantType: 'password',
  scope: 'openid',
  web: {
    client_id: 'nestjs-web-client',
    client_secret: 'c5BJ6IdC8deIhiIsdMvxb75Tt4gVxcRI',
  },
  admin: {
    client_id: 'nest-js-admin',
    client_secret: '8iNkRGgpbKoFv0yRf4w6D6y9qVVSpxkN',
  },
  mobile: {
    client_id: 'nestjs-app-client',
    client_secret: 'SpzBhuNBkPwJBD4jqVgHc8hoTGBy7PAw',
  },
};
