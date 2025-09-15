export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export function toBoolean(value: string): boolean {
  return ["true", "1", "yes", "on"].includes(value.toLowerCase());
}
