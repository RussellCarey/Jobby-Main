import { Comment } from '../entity/Comment';
import { AppDataSource } from '../data-source';
const commentRepository = AppDataSource.getRepository(Comment);

export const save = async (data: Comment) => {
	return await commentRepository.save(data);
};

export const one = async (commentid: number) => {
	return await commentRepository
		.createQueryBuilder(`comments`)
		.innerJoinAndSelect(`comments.creator`, `user`)
		.where(`comments.id = :id`, { id: commentid })
		.orderBy('comments.created_at', 'ASC')
		.getRawOne();
};

export const all = async (skipAmount: number, limitAmount: number, query: string[]) => {
	if (query.length === 0) return await commentRepository.find();

	return await commentRepository
		.createQueryBuilder(`comments`)
		.leftJoinAndSelect(`comments.${query[0]}`, `${query[0]}`)
		.limit(limitAmount)
		.skip(skipAmount)
		.orderBy('comments.created_at', 'ASC')
		.getMany();
};
