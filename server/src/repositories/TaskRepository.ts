import { Task } from '../entity/Task';
import { AppDataSource } from '../data-source';

const taskRepository = AppDataSource.getRepository(Task);

export const save = async (data: Task) => {
	return await taskRepository.save(data);
};

export const remove = async (id: number) => {
	return await taskRepository.createQueryBuilder().delete().from(Task).where('task.id = :id', { id: id }).execute();
};

export const one = async (taskid: number) => {
	return await taskRepository
		.createQueryBuilder(`task`)
		.leftJoinAndSelect(`task.creator`, `creator`)
		.leftJoinAndSelect(`task.members`, `members`)
		.where('task.id = :id', { id: taskid })
		.getOne();
};

export const editTimes = async (taskid: number) => {
	return await taskRepository
		.createQueryBuilder()
		.update(Task)
		.set({ time_logged: 1, time_remaining: 1 })
		.where('id = :id', { id: taskid })
		.execute();
};

export const all = async () => {
	return await taskRepository.find();
};

export const getCreator = async (skipAmount: number, limitAmount: number, taskid: number) => {
	return await taskRepository
		.createQueryBuilder('comment')
		.innerJoinAndSelect('comment.creator', 'creator')
		.where('comment.id = :id', { id: taskid })
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getComments = async (skipAmount: number, limitAmount: number, taskid: number) => {
	return await taskRepository
		.createQueryBuilder('task')
		.select(['task.id', 'comments', 'user.username', 'user.thumbnail'])
		.where('task.id = :id', { id: taskid })
		.innerJoin('task.comments', 'comments')
		.innerJoin('comments.creator', 'user')
		.orderBy('comments.created_at', 'ASC')
		.getRawMany();
};

export const getUpdates = async (skipAmount: number, limitAmount: number, taskid: number) => {
	return await taskRepository
		.createQueryBuilder('task')
		.select(['task.id', 'updates', 'user.username', 'user.thumbnail'])
		.where('task.id = :id', { id: taskid })
		.innerJoin('task.updates', 'updates')
		.innerJoin('updates.user', 'user')
		.limit(limitAmount)
		.skip(skipAmount)
		.orderBy('updates.date', 'ASC')
		.getRawMany();
};

export const getMembers = async (skipAmount: number, limitAmount: number, taskid: number) => {
	return await taskRepository
		.createQueryBuilder('task')
		.innerJoinAndSelect('task.members', 'members')
		.where('task.id = :id', { id: taskid })
		.limit(limitAmount)
		.skip(skipAmount)
		.select(['task.id', 'members'])
		.getOne();
};
