import { Update } from '../entity/Update';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
const upadateRepository = AppDataSource.getRepository(Update);
const userRepository = AppDataSource.getRepository(User);

// userId, type, projectId, taskId, date, deleted_ay
export const save = async (userId: number, type: number, projectId: number, taskId: number) => {
	const date = Math.round(new Date(Date.now()).getTime() / 1000);
	return await upadateRepository.save({ userId, type, projectId, taskId, date });
};

export const all = async (skipAmount: number, limitAmount: number, query: string[]) => {
	if (query.length === 0) return await upadateRepository.find();

	return await upadateRepository
		.createQueryBuilder(`update`)
		.leftJoinAndSelect(`update.${query[0]}`, `${query[0]}`)
		.limit(limitAmount)
		.skip(skipAmount)
		.orderBy('update.date', 'ASC')
		.getMany();
};

export const userUpdates = async (skipAmount: number, limitAmount: number, id: number) => {
	return await upadateRepository
		.createQueryBuilder(`update`)
		.limit(limitAmount)
		.skip(skipAmount)
		.where(`update.userId = :id`, { id: id })
		.orderBy('update.date', 'ASC')
		.getMany();
};

export const projectUpdates = async (skipAmount: number, limitAmount: number, projectid: number) => {
	return await upadateRepository
		.createQueryBuilder(`update`)
		.leftJoinAndSelect(`update.projectId`, `project`)
		.where(`update.projectId = :id`, { id: projectid })
		.limit(limitAmount)
		.skip(skipAmount)
		.orderBy('update.date', 'ASC')
		.getMany();
};

// I need all the updates from all the user projects merged by date...
export const allUpdatesFromAllUsersProjects = async (skipAmount: number, limitAmount: number, userid: number) => {
	return await userRepository
		.createQueryBuilder(`user`)
		.where(`user.id = :id`, { id: userid })
		.select(['user.username', 'project.id', 'project.name', 'update.date', 'update.type', 'creator.username', 'task.title', 'task.id'])
		.innerJoin(`user.projects`, `project`)
		.innerJoin(`project.updates`, `update`)
		.innerJoin(`update.task`, `task`)
		.innerJoin(`update.user`, `creator`)
		.limit(50)
		.skip(skipAmount)
		.orderBy('update.date', 'ASC')
		.getMany();
};
