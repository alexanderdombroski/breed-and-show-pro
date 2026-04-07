import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb } from "../db/index.mts";
import { isDev } from "../utils/index.ts";

const baseURL = process.env.BETTER_AUTH_URL;
const db = await getDb();

const trustedOrigins = [
  "https://alexanderdombroski.github.io",
  "https://alexdombroski.com",
];

let logger = {};

if (isDev) {
  trustedOrigins.push(
    "http://localhost:4321",
    "http://localhost:4322",
    "http://127.0.0.1:4321",
    "http://127.0.0.1:4322",
  );
  logger = {
    disabled: false,
    disableColors: false,
    level: "warn",
  };
}

export const auth = betterAuth({
  appName: "Breed and Show Pro",
  database: mongodbAdapter(db),
  baseURL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  advanced: {
    cookiePrefix: "breed-show-pro",
    cookies: {
      session_token: {
        attributes: {
          sameSite: "None",
          httpOnly: true,
          secure: true, // For some reason this is necessary and also works on localhost
          partitioned: false,
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  account: {
    skipStateCookieCheck: isDev,
  },
  trustedOrigins,
  logger,
});
