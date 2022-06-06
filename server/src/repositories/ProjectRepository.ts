import { Project } from '../entity/Project';
import { Task } from '../entity/Task';
import { AppDataSource } from '../data-source';
const projectRepository = AppDataSource.getRepository(Project);
const taskRepository = AppDataSource.getRepository(Task);

export const save = async (data: Project) => {
	return await projectRepository.save(data);
};

export const remove = async (id: number) => {
	const itemToRemove = await projectRepository.findOneBy({ id: id });
	return await projectRepository.remove(itemToRemove);
};

export const update = async (id: number, newData: Project) => {
	const projectToEdit = await projectRepository.findOne({ where: { id: id } });

	return await projectRepository.save({
		...projectToEdit,
		...newData,
	});
};

export const one = async (projectid: number) => {
	return await projectRepository.findOne({ where: { id: projectid } });
};

export const oneWithMembers = async (projectid: number) => {
	return await projectRepository
		.createQueryBuilder(`project`)
		.innerJoinAndSelect('project.members', 'members')
		.where('project.id = :id', { id: projectid })
		.getOne();
};

export const oneWithTasks = async (projectid: number) => {
	return await projectRepository
		.createQueryBuilder(`project`)
		.innerJoinAndSelect('project.tasks', 'tasks')
		.where('project.id = :id', { id: projectid })
		.getOne();
};

export const all = async (skipAmount: number, limitAmount: number, query: string[]) => {
	if (query.length === 0) return await projectRepository.find();

	return await projectRepository
		.createQueryBuilder(`project`)
		.innerJoinAndSelect(`project.${query[0]}`, `${query[0]}`)
		.limit(limitAmount)
		.skip(skipAmount)
		.getMany();
};

export const getComments = async (skipAmount: number, limitAmount: number, projectid: number) => {
	return await projectRepository
		.createQueryBuilder('project')
		.select(['comments', 'user.username', 'user.thumbnail'])
		.where('project.id = :id', { id: projectid })
		.innerJoin('project.tasks', 'tasks')
		.innerJoin('tasks.comments', 'comments')
		.innerJoin('comments.creator', 'user')
		.limit(limitAmount)
		.orderBy('comments.created_at', 'ASC')
		.getRawMany();
};

export const getMembers = async (skipAmount: number, limitAmount: number, projectid: number) => {
	return await projectRepository
		.createQueryBuilder('project')
		.innerJoin('project.members', 'members')
		.where('project.id = :id', { id: projectid })
		.select(['project', 'members.id', 'members.username', 'members.firstName', 'members.lastName', 'members.thumbnail'])
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getUpdates = async (skipAmount: number, limitAmount: number, projectid: number) => {
	return await projectRepository
		.createQueryBuilder('project')
		.innerJoinAndSelect('project.tasks', 'tasks')
		.innerJoinAndSelect('tasks.updates', 'updates')
		.where('project.id = :id', { id: projectid })
		.limit(limitAmount)
		.skip(skipAmount)
		.orderBy('updates.date', 'ASC')
		.getOne();
};

export const getTasks = async (projectid: number) => {
	return await taskRepository
		.createQueryBuilder('tasks')
		.select(['tasks', 'members.id'])
		.where('tasks.projectId = :id', { id: projectid })
		.leftJoin('tasks.members', 'members')
		.getMany();
};
