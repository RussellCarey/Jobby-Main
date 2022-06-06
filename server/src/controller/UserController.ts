import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { User } from '../entity/User';
const userRepository = AppDataSource.getRepository(User);
import * as UserRepository from '../repositories/UserRepository';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

exports.all = catchAsync(async (req: Request, res: Response) => {
	const query = req.query.include ? req.query.include.split(',') : [];
	const skipAmount = req.query.skip ?? 0;
	const limitAmount = req.query.limit ?? 0;

	const users = await UserRepository.all(skipAmount, limitAmount, query);

	res.json({
		status: 'success',
		data: users,
	});
});

exports.allLike = catchAsync(async (req: Request, res: Response) => {
	const query = req.body.string;
	const users = await userRepository.findBy({ username: Like(`%${query}%`) });

	res.json({
		status: 'success',
		data: users ?? [],
	});
});

exports.one = catchAsync(async (req: Request, res: Response) => {
	const user = await UserRepository.one(req.user.id);

	res.json({
		status: 'success',
		data: user,
	});
});

exports.comments = catchAsync(async (req: Request, res: Response) => {
	const skipAmount = req.query.skip ?? 0;
	const limitAmount = req.query.limit ?? 0;

	const data = await UserRepository.getComments(skipAmount, limitAmount, req.user.id);

	res.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.createdProjects = catchAsync(async (req: Request, res: Response) => {
	const skipAmount = req.query.skip ?? 0;
	const limitAmount = req.query.limit ?? 0;

	const data = await UserRepository.getCreatedProjects(skipAmount, limitAmount, req.user.id);

	res.json({
		status: 'success',
		data: data.created_projects ?? [],
	});
});

exports.tasks = catchAsync(async (req: Request, res: Response) => {
	const skipAmount = req.query.skip ?? 0;
	const limitAmount = req.query.limit ?? 0;

	const data = await UserRepository.getTasks(skipAmount, limitAmount, req.user.id);

	res.json({
		status: 'success',
		data: data.tasks ?? [],
	});
});

exports.deleteAccount = catchAsync(async (req: Request, res: Response) => {
	const userid = req.user.id;
	await UserRepository.remove(userid);

	res.json({
		status: 'success',
	});
});

exports.projects = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await UserRepository.getProjects(skipAmount, limitAmount, request.user.id);

	response.json({
		status: 'success',
		data: data?.projects ?? [],
	});
});

exports.createdTasks = catchAsync(async (req: Request, res: Response) => {
	const skipAmount = req.query.skip ?? 0;
	const limitAmount = req.query.limit ?? 0;

	const data = await UserRepository.getCreatedTasks(skipAmount, limitAmount, req.user.id);

	res.json({
		status: 'success',
		data: data.created_tasks ?? [],
	});
});

exports.updateImage = catchAsync(async (req: Request, res: Response) => {
	const userToUpdate = await UserRepository.one(req.user.id);
	if (!userToUpdate) throw new AppError('Could not find user', 404);
	const data = await UserRepository.updateUserImages(userToUpdate, req.user.thumbnail, req.user.image);

	res.json({
		status: 'success',
		data: data ?? [],
	});
});
