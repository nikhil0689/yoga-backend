export default () => ({
  accessSecret: process.env.ACCESS_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
  jwtAlgorithm: process.env.JWT_ALGORITHM,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  httpOnly: process.env.HTTP_ONLY,
  sameSite: process.env.SAME_SITE,
  domain: process.env.DOMAIN,
  secure: process.env.SECURE,
  accessTokenName: process.env.ACCESS_TOKEN_NAME,
  refreshTokenName: process.env.REFRESH_TOKEN_NAME,
});
