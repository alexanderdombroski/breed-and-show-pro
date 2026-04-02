/**
 * Navigation utility to properly handle base URL paths
 */

export function getBaseUrl(): string {
  // In Astro pages/components, use import.meta.env.BASE_URL
  // This function is for when you need the base URL in a context where it might not be available
  if (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL;
  }
  return "/breed-and-show-pro/breeder";
}

export function getNavLink(path: string): string {
  const baseUrl = getBaseUrl();
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
}
