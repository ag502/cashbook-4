import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const createHashedPassword = (password) => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};

const checkPassword = (password, hashedPassword) => {
  const isPasswordCorrect = compareSync(password, hashedPassword);
  return isPasswordCorrect;
};

export { createHashedPassword, checkPassword };
