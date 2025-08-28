export function shouldUseDevAuth(): boolean {
  const devEmail = import.meta.env.VITE_DEV_AUTH_EMAIL as unknown;
  const devPassword = import.meta.env.VITE_DEV_AUTH_PASS as unknown;

  return (
    !import.meta.env.PROD &&
    typeof devEmail === 'string' &&
    devEmail.length > 0 &&
    typeof devPassword === 'string' &&
    devPassword.length > 0
  );
}

export function getDevCredentials(): { email: string; password: string } | null {
  if (!shouldUseDevAuth()) {
    return null;
  }
  return {
    email: import.meta.env.VITE_DEV_AUTH_EMAIL as string,
    password: import.meta.env.VITE_DEV_AUTH_PASS as string,
  };
}
