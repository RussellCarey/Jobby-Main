import AppError from '../../utils/AppError';
import { Project } from '../../entity/Project';
import { User } from '../../entity/User';

export const checkProjectIsOnUser = (user: User, data: Project) => {
	const hasProject = user.projects.map((p) => {
		if (p.id === data.id) return true;
	});

	if (!hasProject) throw new AppError('You are not assigned to this project and cannot access the resources assisiated with it.', 401);

	return hasProject;
};
