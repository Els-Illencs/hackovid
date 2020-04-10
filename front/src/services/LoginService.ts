const KEY_LOGIN_REDIRECT = 'login_redirect';

export const saveLoginRedirect = async (url: string): Promise<boolean> => {
  localStorage.setItem(KEY_LOGIN_REDIRECT, url);
  return true;
}

export const clearLoginRedirect = async (): Promise<boolean> => {
  localStorage.removeItem(KEY_LOGIN_REDIRECT);
  return true;
}

export const getLoginRedirect = async (): Promise<string | undefined> => {
  const redirect = localStorage.getItem(KEY_LOGIN_REDIRECT);

  return redirect !== null ? redirect : undefined;
}