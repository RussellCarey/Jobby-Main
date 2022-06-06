import * as bcrypt from "bcryptjs";

// Check that both passwords the user has provided mathces
export const checkPasswordsMatch = (passwordOne: string, passwordTwo: string) => {
  if (passwordOne !== passwordTwo) return false;
  return true;
};

// Encrypt the password provided
export const bcryptPassword = async (password: string) => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const cryptedPassword = await bcrypt.hash(password, salt);
  return cryptedPassword;
};

// Encrypt the password provided
export const bcryptPasswordSync = (password: string) => {
  const saltRounds = 12;
  const salt = bcrypt.genSaltSync(saltRounds);
  const cryptedPassword = bcrypt.hashSync(password, salt);
  return cryptedPassword;
};

export const bcryptComaprePasswords = async (password: string, hasedPassword: string) => {
  console.log(password, hasedPassword);
  const checkedPassword = await bcrypt.compare(password, hasedPassword);
  return checkedPassword;
};
