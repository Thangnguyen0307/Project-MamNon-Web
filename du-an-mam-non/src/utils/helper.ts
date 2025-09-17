export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateYearRange = (value: string): boolean => {
  const match = value.match(/^(\d{4})-(\d{4})$/);
  if (!match) return false;

  const start = parseInt(match[1], 10);
  const end = parseInt(match[2], 10);

  return start <= end;
};

export function toBoolean(value: string): boolean {
  return ["true", "1", "yes", "on"].includes(value.toLowerCase());
}

export const yearOptions = Array.from({ length: 11 }, (_, i) => {
  const year = 2025 + i;
  return { label: year.toString(), value: year.toString() };
});
