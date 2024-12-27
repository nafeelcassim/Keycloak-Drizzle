export const KeyCloakConfig = {
  baseUrl: process.env.KEYCLOAK_BASE_URL,
  grantType: process.env.KEYCLOAK_GRANT_TYPE,
  scope: process.env.KEYCLOAK_SCOPE,
  web: {
    client_id: process.env.KEYCLOAK_WEB_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_WEB_CLIENT_SECRET,
  },
  admin: {
    client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET,
  },
  mobile: {
    client_id: process.env.KEYCLOAK_MOBILE_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_MOBILE_CLIENT_SECRET,
  },
};
