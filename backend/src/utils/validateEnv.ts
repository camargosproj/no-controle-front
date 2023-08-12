import { cleanEnv, email, host, num, port, str } from "envalid";

function validateEnv() {
  return cleanEnv(process.env, {
    PORT: port(),
    EMAIL_HOST: host(),
    EMAIL_PORT: port(),
    EMAIL_USER: email(),
    EMAIL_PASSWORD: str(),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str(),
    BCRYPT_SALT_ROUNDS: num(),
    VERIFICATION_CODE_EXPIRES_IN: str(),
    NODE_ENV: str(),
  });
}

export const envConfig = validateEnv();
