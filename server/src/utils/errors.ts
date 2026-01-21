export const assertString = (value: unknown, message: string): string => {
  if (typeof value !== "string") {
    throw new Error(message);
  }
  return value;
};
