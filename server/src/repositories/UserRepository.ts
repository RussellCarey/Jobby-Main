import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
const userRepository = AppDataSource.getRepository(User);

export const save = async (data: User) => {
	return await userRepository.save(data);
};

export const remove = async (id: number) => {
	const itemToRemove = await userRepository.findOneBy({ id: id });
	return await userRepository.remove(itemToRemove);
};

export const getByPartialUsername = async (skipAmount: number, limitAmount: number, string: string) => {
	return await userRepository
		.createQueryBuilder('user')
		.where('user.username like :text', { text: string })
		.select(['user.id', 'user.firstName', 'user.lastName', 'user.username'])
		.limit(limitAmount)
		.skip(skipAmount)
		.getMany();
};

export const one = async (userid: number) => {
	return await userRepository.findOne({ where: { id: userid } });
};

export const oneByKey = async (key: string, value: string) => {
	return await userRepository.findOne({ where: { [key]: value } });
};

export const getUserByUsername = async (username: string) => {
	return await userRepository.findOne({
		where: { username: username },
		relations: ['projects', 'created_tasks', 'tasks', 'created_projects'],
		select: [
			'id',
			'firstName',
			'lastName',
			'password',
			'username',
			'email',
			'thumbnail',
			'image',
			'dob',
			'projects',
			'created_projects',
			'created_tasks',
			'tasks',
			'is_verified',
		],
	});
};

export const verifyUser = async (user: User) => {
	await userRepository
		.createQueryBuilder()
		.update(user)
		.set({ is_verified: true, verification_token: '' })
		.where('id = :id', { id: user.id })
		.execute();

	return user;
};

export const updateUserImages = async (user: User, thumbnail: string, larger: string) => {
	await userRepository.createQueryBuilder().update(user).set({ thumbnail: thumbnail, image: larger }).where('id = :id', { id: user.id }).execute();
	return user;
};

export const all = async (skipAmount: number, limitAmount: number, query: any) => {
	if (query.length === 0) return await userRepository.find();

	return await userRepository
		.createQueryBuilder(`users`)
		.leftJoinAndSelect(`users.${query[0]}`, `${query[0]}`)
		.limit(limitAmount)
		.skip(skipAmount)
		.getMany();
};

export const getComments = async (skipAmount: number, limitAmount: number, userid: number) => {
	return await userRepository
		.createQueryBuilder('user')
		.leftJoinAndSelect('user.comments', 'comments')
		.where('user.id = :id', { id: userid })
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getTasks = async (skipAmount: number, limitAmount: number, userid: number) => {
	return await userRepository
		.createQueryBuilder('user')
		.leftJoinAndSelect('user.tasks', 'tasks')
		.where('user.id = :id', { id: userid })
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getCreatedProjects = async (skipAmount: number, limitAmount: number, userid: number) => {
	return await userRepository
		.createQueryBuilder('user')
		.where('user.id = :id', { id: userid })
		.select(['user.id', 'created_projects'])
		.innerJoin('user.created_projects', 'created_projects')
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getProjects = async (skipAmount: number, limitAmount: number, userid: number) => {
	return await userRepository
		.createQueryBuilder('user')
		.select(['user.id', 'userprojects'])
		.where('user.id = :id', { id: userid })
		.innerJoin('user.projects', 'userprojects')
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getCreatedTasks = async (skipAmount: number, limitAmount: number, userid: number) => {
	return await userRepository
		.createQueryBuilder('user')
		.where('user.id = :id', { id: userid })
		.select(['user.id', 'created_tasks'])
		.innerJoin('user.created_tasks', 'created_tasks')
		.limit(limitAmount)
		.skip(skipAmount)
		.getOne();
};

export const getCreatedAndNonCreatedProjects = async (userid: number) => {
	return await userRepository.findOne({ where: { id: userid }, relations: ['created_projects', 'projects'] });
};
