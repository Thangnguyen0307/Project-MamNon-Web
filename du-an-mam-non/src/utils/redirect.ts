let redirectHandler: ((path: string) => void) | null = null;

export const setRedirectHandler = (fn: (path: string) => void) => {
  redirectHandler = fn;
};

export const redirect = (path: string) => {
  if (redirectHandler) redirectHandler(path);
};
