import * as jwt from 'jsonwebtoken';
import { Response, CookieOptions, Request } from 'express';
import { promisify } from 'util';
import AppError from '../utils/AppError';
import { User } from '../entity/User';

// Create a JWT, set a cookie and its options and send it back to the client......
export const createAndSendJWT = async (res: Response, data: User) => {
	// Sign token with data provided
	const token = await jwt.sign(JSON.stringify(data), process.env.JWT_SECRET!);
	if (!token) throw new AppError('Failed in signing token', 500);

	const oneWeek = 604800000;

	const cookieOptions: CookieOptions = {
		expires: new Date(Date.now() + oneWeek),
		secure: true,
		httpOnly: false,
		sameSite: 'none',
	};

	res.cookie('jwt', token, cookieOptions);

	res.json({
		status: 'success',
		data: token,
	});
};

export const veriftJWTFromCookie = async (jwtToken: string) => {
	// Replace with cookie in production?
	if (!jwtToken) throw new AppError('Sorry. Cookie error. Something went wrong on our end.', 500);

	const token = jwtToken;
	if (!token) throw new AppError('User is not logged in.', 500);

	// Verify and decode the token and check for errors
	const checkedCookie = await promisify(jwt.verify)(token, process.env.JWT_SECRET!);
	return checkedCookie;
};
