import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as UpdateRepository from '../repositories/UpdateRepository';

// All minus joins
exports.all = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
	const query = request.query.include ? request.query.include.split(',') : [];
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const updates = await UpdateRepository.all(skipAmount, limitAmount, query);

	response.json({
		status: 'success',
		data: updates,
	});
});

exports.userUpdates = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;
	const allUpdates = await UpdateRepository.userUpdates(skipAmount, limitAmount, request.user.id);

	response.json({
		status: 'success',
		data: allUpdates,
	});
});

exports.userProjectUpdates = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;
	const allUpdates = await UpdateRepository.projectUpdates(skipAmount, limitAmount, request.user.currentproject);

	response.json({
		status: 'success',
		data: allUpdates,
	});
});

exports.getAllUserProjectsUpdates = catchAsync(async (request: Request, response: Response, next: NextFunction) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;
	const allUpdates = await UpdateRepository.allUpdatesFromAllUsersProjects(skipAmount, limitAmount, request.user.id);

	response.json({
		status: 'success',
		data: allUpdates,
	});
});
