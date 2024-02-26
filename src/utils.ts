import * as bcrypt from 'bcrypt';

export const hash = async (data: string): Promise<string> => {
  return bcrypt.hash(data, bcrypt.genSaltSync());
};

export const valueExists = (value: unknown): boolean =>
  value !== null && value !== undefined;
