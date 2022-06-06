import { Request, NextFunction, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import * as UserRepository from '../repositories/UserRepository';
import { veriftJWTFromCookie } from '../controller/JWTController';

//
exports.isAdmin = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
	if (!request.user.isAdmin) throw new AppError('You are not assigned to this project and cannot access the resources assisiated with it.', 401);

	next();
});

exports.checkProject = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
	const projectid = request.params.projectid;
	if (!projectid) throw new AppError(' Project ID not provided', 401);

	// Grab the users created projects and created projects.
	const userProjects = await UserRepository.getCreatedAndNonCreatedProjects(request.user.id);

	const hasProject = userProjects.projects.filter((e) => +e.id === +projectid).length > 0;
	const isCreator = userProjects.created_projects.filter((e) => +e.id === +projectid).length > 0;

	if (!hasProject && !isCreator && !request.user.isAdmin)
		throw new AppError('You are not assigned to this project and cannot access the resources assisiated with it.', 401);

	next();
});

exports.checkLoggedIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const verifiedToken = await veriftJWTFromCookie(req.headers.jwt);
	if (!verifiedToken) throw new AppError('User is not logged in.', 401);

	req.user = verifiedToken;
	req.user.password = null;
	next();
});
