import { Request, Response, CookieOptions } from 'express';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import * as UserRepository from '../repositories/UserRepository';
import * as AuthHelpers from './utils/authUtils';
import { createAndSendJWT } from './JWTController';

// login, check email exists and check and decrypt pasword to check if we can login, send back JWT cookie and data.
exports.login = catchAsync(async (req: Request, res: Response) => {
	if (!req.body.username || !req.body.password) throw new AppError('Please include both a username and a password', 500);

	// Check email exists - Put project and task data onto the user object for checks
	const checkForUser = await UserRepository.getUserByUsername(req.body.username);
	if (!checkForUser) throw new AppError('Error logging in, incorrect username or password', 500);

	// Is user validated?
	// if (!checkForUser.is_verified) throw new AppError('Not authenticated yet it seems! We have sent you an authentication email.', 500);

	// Use bcrypt to check passwords match
	const checkedPassword = await AuthHelpers.bcryptComaprePasswords(req.body.password, checkForUser.password);
	if (!checkedPassword) throw new AppError('Username or password is incorrect.', 500);

	// Remove password
	checkForUser.password = null;

	// If so, send back the JWT and data..
	await createAndSendJWT(res, checkForUser);
});

exports.logout = (req: Request, res: Response) => {
	// Overwrite JWT so user cannot log in.
	res.clearCookie('jwt');

	res.json({
		status: 'success',
	});
};

// Authorize user to accss the about from link in their email. They cannot login until they do this..
exports.authorize = catchAsync(async (req: Request, res: Response) => {
	// www.website.com/?user=df82f-23f23f-f23f23f-23f23f
	const token = req.params.verificationtoken;
	if (!token || token === '') throw new AppError('URL does not contain valid ID string', 500);

	const foundUser = await UserRepository.oneByKey('verification_token', token);
	if (!foundUser) throw new AppError('Could not find user with the auth key.', 500);
	if (foundUser.is_verified) throw new AppError('You are already authenticated.', 500);

	// Set user to verified and set the verification token to null..
	await UserRepository.verifyUser(foundUser);

	//? Next need to send an email to the user letting them know.
	//!

	//? Redirect user to the login page..
	//!

	res.json({
		status: 'success',
	});
});

exports.signup = catchAsync(async (req: Request, res: Response) => {
	// Check if everything has been sent
	const { firstName, lastName, username, email, password, passwordConfirm, dob } = req.body;

	if (!firstName || !lastName || !username || !email || !password || !passwordConfirm || !dob) throw new AppError('Please include all fields', 500);

	// Check passwords match
	if (password !== passwordConfirm) throw new AppError('Please use matching passwords', 500);

	// Check username, email etc is unqiue
	const usernameUnique = await UserRepository.oneByKey('username', username);
	if (usernameUnique) throw new AppError('This username is taken! Please choose a new one.', 500);

	const emailUnique = await UserRepository.oneByKey('email', email);
	if (emailUnique) throw new AppError('Email taken. Do you already have an account?', 500);

	// has password
	req.body.password = await AuthHelpers.bcryptPassword(req.body.password);

	// Save user with
	await UserRepository.save(req.body);

	// Send email to verify user
	// Nt going to implement email features into this application for now..

	const newUser = await UserRepository.getUserByUsername(username);

	// Send user back via token to log them in..
	createAndSendJWT(res, newUser);
});

exports.isUserLoggedIn = catchAsync(async (req: Request, res: Response) => {
	res.json({
		status: 'success',
		data: req.user ?? null,
	});
});

exports.forgottenPassword = catchAsync(async (req: Request, res: Response) => {
	// check if the user exists with that email
	const foundUser = await UserRepository.oneByKey('email', req.body.email);
	if (!foundUser) throw new AppError('There is no user with this email.', 404);

	// send email with URL including verification token

	// Return user to the login page
	res.json({
		status: 'success',
	});
});
