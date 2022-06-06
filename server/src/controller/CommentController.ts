import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as CommentRepository from '../repositories/CommentRepository';
import { save as SaveUpdate } from '../repositories/UpdateRepository';

// All minus joins
exports.all = catchAsync(async (request: Request, response: Response) => {
	const skipAmount = +request.query.skip ?? 0;
	const limitAmount = +request.query.limit ?? 0;
	const query = request.query.include ? request.query.include.split(',') : [];

	const comments = await CommentRepository.all(skipAmount, limitAmount, query);

	response.json({
		status: 'success',
		data: comments,
	});
});

// One
exports.one = catchAsync(async (request: Request, response: Response) => {
	const comment = await CommentRepository.one(request.params.commentid);

	response.json({
		status: 'success',
		data: comment,
	});
});

// id, comment, creator, creatorId, task, taskId, project, projectId, created_at, deleted_at
exports.addComment = catchAsync(async (request: Request, response: Response) => {
	const comment = await CommentRepository.save(request.body);
	const returnComment = await CommentRepository.one(comment.id);
	await SaveUpdate(request.user.id, 3, request.params.projectid, request.params.taskid);

	response.json({
		status: 'success',
		data: returnComment,
	});
});
