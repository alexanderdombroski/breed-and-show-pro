import type { User } from "better-auth";
import { createAuthClient } from "better-auth/svelte";

const sitePath = import.meta.env.BASE_URL;

export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_SERVER_URL,
  basePath: "/api/auth",
});

// @ts-ignore - TS2304
export const userData: { user?: User } = $state({});

const res = authClient.getSession();

res.then((session) => {
  if (session.data) {
    // User is logged in, 'data' contains the session and user info
    console.info("Logged in as:", session.data.user.email);
    userData.user = session.data.user;
  } else {
    console.info("Not logged in");
  }
});

/** @param redirectPath - ie /dashboard or /settings */
export async function login(redirectPath: string) {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${window.location.origin}${sitePath}${redirectPath}`,
  });
}

export async function loginAsTestUser(
  email: string,
  password: string,
  redirect?: string,
) {
  return await authClient.signIn.email({
    email,
    password,
    rememberMe: true,
    fetchOptions: {
      redirect: "error",
    },
    callbackURL: redirect || "",
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
