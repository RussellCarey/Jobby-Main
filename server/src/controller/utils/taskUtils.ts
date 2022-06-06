import AppError from '../../utils/AppError';
import { User } from '../../entity/User';

export const checkCreatorOfTask = async (user: User, id: number) => {
	const hasTask = user.created_tasks.filter((t) => t.id == id).length > 0;
	return hasTask;
};

// Main
export const checkTaskIsOnUser = async (user: User, id: number) => {
	const hasTask = user.tasks.filter((t) => +t.id == +id).length > 0;
	const isCreator = await checkCreatorOfTask(user, id);

	if (!hasTask && !isCreator) throw new AppError('You are not assigned to this task', 401);
	return hasTask;
};

//
