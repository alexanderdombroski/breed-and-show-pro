import { createAuthClient } from "better-auth/client";

const BASE_URL = import.meta.env.BASE_URL;

export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_SERVER_URL,
});

/** @param redirectPath - ie /dashboard or /settings */
export async function login(redirectPath: string) {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${BASE_URL}${redirectPath}`,
  });
}

export async function logout() {
  await authClient.signOut();
}

export async function getSession() {
  return await authClient.getSession?.();
}

export async function getUser() {
  const session = await getSession();
  return session?.data?.user ?? null;
}

export async function isLoggedIn() {
  return !!(await getUser());
}
