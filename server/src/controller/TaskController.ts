import AppError from '../utils/AppError';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { Task } from '../entity/Task';
import * as TaskRepository from '../repositories/TaskRepository';
import { checkCreatorOfTask, checkTaskIsOnUser } from './utils/taskUtils';
import { save as SaveUpdate } from '../repositories/UpdateRepository';

// All minus joins
exports.all = catchAsync(async (request: Request, response: Response) => {
	const tasks = await TaskRepository.all();

	response.json({
		status: 'success',
		data: tasks,
	});
});

// One
exports.one = catchAsync(async (request: Request, response: Response) => {
	const task = await TaskRepository.one(request.params.taskid);

	response.json({
		status: 'success',
		data: task,
	});
});

exports.save = catchAsync(async (request: Request, response: Response) => {
	const { title, description, type, priority, members } = request.body;

	// Double check we have saved the project ID from the middleware
	if (!request.params.projectid) throw new AppError('Project ID was not provided', 500);

	const newTask = new Task();
	newTask.title = title;
	newTask.description = description;
	newTask.type = type;
	newTask.priority = priority;
	newTask.projectId = request.params.projectid;
	newTask.members = [...members, { id: request.user.id }];
	newTask.creatorId = request.user.id;
	await TaskRepository.save(newTask);

	// Add update for creation of task.
	await SaveUpdate(request.user.id, 0, request.user.currentproject, newTask.id);

	response.json({
		status: 'success',
		data: newTask,
	});
});

exports.update = catchAsync(async (request: Request, response: Response) => {
	const { title, description, type, priority, members } = request.body;

	checkCreatorOfTask(request.user, request.params.taskid);

	// Double check we have saved the project ID from the middleware
	if (!request.params.projectid) throw new AppError('Project ID was not provided', 500);

	const taskToEdit = await TaskRepository.one(request.params.taskid);
	const updatedTask = { ...taskToEdit, title, description, type, priority, members };
	await TaskRepository.save(updatedTask);

	// Add update for creation of task.
	await SaveUpdate(request.user.id, 2, request.user.currentproject, updatedTask.id);

	response.json({
		status: 'success',
		data: updatedTask,
	});
});

exports.remove = catchAsync(async (request: Request, response: Response) => {
	const taskID = request.params.taskid;

	checkCreatorOfTask(request.user, taskID);

	const task = await TaskRepository.one(taskID);
	if (!task) throw new AppError('Could not find task to delete', 404);

	const taskToRemove = await TaskRepository.remove(taskID);

	// Add update for remove of task
	await SaveUpdate(request.user.id, 1, request.user.currentproject, null);

	response.json({
		status: 'success',
		data: taskToRemove,
	});
});

exports.changeTimes = catchAsync(async (request: Request, response: Response) => {
	const addLoggedAmount = request.body.timeLogged;
	const remainingAmount = request.body.timeRemaining;

	checkTaskIsOnUser(request.user, request.params.taskid);
	const task = await TaskRepository.one(request.params.taskid);

	if (addLoggedAmount) {
		task.time_logged = task.time_logged += +addLoggedAmount;
		task.time_remaining = task.time_remaining - +addLoggedAmount;
	}

	if (remainingAmount !== null) task.time_remaining = +remainingAmount;

	await TaskRepository.save(task);

	// Add an update for log of time or completetion time
	if (addLoggedAmount !== 0) await SaveUpdate(request.user.id, 5, request.user.currentproject, request.params.taskid);
	if (remainingAmount !== null) await SaveUpdate(request.user.id, 4, request.user.currentproject, request.params.taskid);

	response.json({
		status: 'success',
		data: task,
	});
});

exports.comments = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await TaskRepository.getComments(skipAmount, limitAmount, request.params.taskid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.members = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await TaskRepository.getMembers(skipAmount, limitAmount, request.params.taskid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.removeMember = catchAsync(async (request: Request, response: Response) => {
	const memberToRemoveId = request.body.memberid;

	const taskToEdit = await TaskRepository.one(request.params.taskid);
	taskToEdit.members = taskToEdit.members.filter((m) => m.id !== memberToRemoveId);
	await TaskRepository.save(taskToEdit);

	response.json({
		status: 'success',
		data: memberToRemoveId,
	});
});

exports.creator = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await TaskRepository.getCreator(skipAmount, limitAmount, request.params.taskid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});

exports.updates = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = request.query.skip ?? 0;
	const limitAmount = request.query.limit ?? 0;

	const data = await TaskRepository.getUpdates(skipAmount, limitAmount, request.params.taskid);

	response.json({
		status: 'success',
		data: data ?? [],
	});
});
