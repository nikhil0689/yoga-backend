import { createHash } from 'crypto';
import secureRandomString from 'secure-random-string';

export const hash = async (data: string): Promise<string> => {
  return createHash('sha256').update(data).digest('hex');
};

export const valueExists = (value: unknown): boolean =>
  value !== null && value !== undefined;

export const genToken = (length = 20): string => {
  return secureRandomString({ length });
};
