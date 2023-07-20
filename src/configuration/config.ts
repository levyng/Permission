export default () => ({
  google: {
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
  },
  cookie: {
    jwtMaxAge: process.env.MAX_AGE_JWT || 3600000,
    rfJwtMaxAge: process.env.MAX_AGE_RF_JWT || 604800000,
  },
  jwt: {
    secret: process.env.SECRET || 'secret',
    expire: process.env.EXPIRE || 86400,
    rf_secret: process.env.RF_SECRET || '',
    rf_expire: process.env.RF_EXPIRE || 2592000,
  },
  twilio: {
    account_sid: process.env.ACCOUNT_SID,
    auth_token: process.env.AUTH_TOKEN,
    service_sid: process.env.SERVICE_SID
  },
  port: process.env.PORT || 3000
})