import argon2 from "argon2";

export const hashPassword = async (password: string) => {
  const hash = await argon2.hash(password);
  return hash;
};

export const verifyPassword = async (password: string, hash: string) => {
  const isMatch = await argon2.verify(hash, password);
  return isMatch;
};
