export function storeTokenInCookie(token: string, days = 7): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `basicAuthToken=${token}; path=/; expires=${expires}; secure; SameSite=Lax`;
}

export function getTokenFromCookie() {
  return (
    document.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("basicAuthToken="))
      ?.split("=")[1] ?? null
  );
}

export function clearTokenCookie(): void {
  document.cookie = `basicAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Lax`;
}

export const requestInterceptor = () => {
  return {
    headers: {
      Authorization: `Basic ${getTokenFromCookie()}`,
    },
  };
};
