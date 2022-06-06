import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { createAndSendJWT } from './JWTController';
import { Project } from '../entity/Project';
const projectEntityRepo = AppDataSource.getRepository(Project);
import * as ProjectRepository from '../repositories/ProjectRepository';
import * as UserRepository from '../repositories/UserRepository';
import AppError from '../utils/AppError';

exports.all = catchAsync(async (request: Request, response: Response) => {
	const query = request.query.include ? request.query.include.split(',') : [];
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await ProjectRepository.all(skipAmount, limitAmount, query);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

// One ----- GEt project with a USERID.. Get projects with the userID..
exports.one = catchAsync(async (request: Request, response: Response) => {
	const data = await ProjectRepository.one(request.params.projectid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.saveNew = catchAsync(async (request: Request, response: Response) => {
	const { name, description } = request.body;

	const newProject = new Project();
	newProject.name = name;
	newProject.description = description;
	newProject.creatorId = request.user.id;
	// @ts-ignore
	newProject.members = [{ id: request.user.id }];
	newProject.thumbnail = request.project.thumbnail;
	newProject.image = request.project.larger;
	await ProjectRepository.save(newProject);

	// After saving project send back a new JWT with the updated projects on the object.
	const user = await UserRepository.getUserByUsername(request.user.username);
	createAndSendJWT(response, user);
});

exports.remove = catchAsync(async (request: Request, response: Response) => {
	const projectToDelete = await ProjectRepository.remove(request.params.projectid);

	response.json({
		status: 'success',
		data: projectToDelete,
	});
});

exports.update = catchAsync(async (request: Request, response: Response) => {
	const projectToUpdate = await ProjectRepository.update(request.params.projectid, request.body);

	response.json({
		status: 'success',
		data: projectToUpdate,
	});
});

exports.addMember = catchAsync(async (request: Request, response: Response) => {
	const foundProject = await ProjectRepository.oneWithMembers(request.params.projectid);
	if (!foundProject) throw new AppError('Cannot find project with this ID', 404);

	const foundUser = await UserRepository.one(request.params.userid);
	if (!foundProject) throw new AppError('Cannot find user with this ID', 404);

	// @ts-ignore
	foundProject.members = [...foundProject.members, foundUser];
	await projectEntityRepo.save(foundProject);

	response.json({
		status: 'success',
		data: foundUser,
	});
});

exports.removeMember = catchAsync(async (request: Request, response: Response) => {
	const foundProject = await ProjectRepository.oneWithMembers(request.params.projectid);
	if (!foundProject) throw new AppError('Cannot find project with this ID', 404);

	foundProject.members = foundProject.members.filter((m) => +m.id !== +request.params.userid);

	await projectEntityRepo.save(foundProject);

	response.json({
		status: 'success',
		data: +request.params.userid,
	});
});

exports.comments = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await ProjectRepository.getComments(+skipAmount, +limitAmount, request.params.projectid);
	console.log(data);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.members = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await ProjectRepository.getMembers(skipAmount, limitAmount, request.params.projectid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.tasks = catchAsync(async (request: Request, response: Response) => {
	const data = await ProjectRepository.getTasks(request.params.projectid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.updates = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await ProjectRepository.getUpdates(skipAmount, limitAmount, request.params.projectid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});
