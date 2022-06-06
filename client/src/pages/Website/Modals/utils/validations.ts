import validator from "validator";
import { ISignUpUser } from "../interfaces/interfaces";

export const validateEmail = (email: string) => {
  if (validator.isEmpty(email)) return "Please include a email";

  if (email === "" || null) return "Please enter more than one character..";
  if (!validator.isEmail(email)) return "Please enter a correct email";
};

export const validatePassword = (password: string, passwordConfirm: string) => {
  if (validator.isEmpty(password)) return "Please include a password";

  const passwordOptions = {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  const validatePassword = validator.isStrongPassword(password, passwordOptions);

  if (!validatePassword)
    return "Please ensure your password has at least 8 characters, one uppercase letter, one lowercase letter and one symbol.";

  if (password !== passwordConfirm) return "Passwords do not match, please try again";
};

export const validateDOB = (dob: any) => {
  if (!dob) return "Please enter a valid date of birth";
  if (typeof dob !== "number") return "Error with date of birth, please try again";
};

export const validateUsername = (username: string) => {
  if (validator.isEmpty(username)) return "Please include a username";
  if (username.length < 5) return "Username must be greater than 5 characters";

  const regSymbols = /[$-/:-?{-~!"^_`\[\]]/u;
  if (regSymbols.test(username)) return "Username must not contain any symbols";
};

export const validateName = (name: string) => {
  if (validator.isEmpty(name)) return "Please enter a full name";

  const regSymbols = /[$-/:-?{-~!"^_`\[\]]/u;
  if (regSymbols.test(name)) return "A name must not contain any symbols";
};

// export interface ISignUpUser {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   dob: number;
// }

export const validateSignUp = (user: ISignUpUser) => {
  const firstName = validateName(user.firstName);
  const lastName = validateName(user.lastName);
  const username = validateUsername(user.username);
  const email = validateEmail(user.email);
  const passwords = validatePassword(user.password, user.passwordConfirm);
  const dob = validateDOB(user.dob);

  if (firstName) return firstName;
  if (lastName) return lastName;
  if (username) return username;
  if (email) return email;
  if (passwords) return passwords;
  if (dob) return dob;
};

export const validateLogin = () => {};
