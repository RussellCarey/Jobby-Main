import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { User } from '../../entity/User';
import { Task } from '../../entity/Task';
import { Comment } from '../../entity/Comment';
import { Update } from '../../entity/Update';
import { Project } from '../../entity/Project';

import { saveEntities, editEntities, getRandom } from '../utils/seedingHelpers';

// https://dev.to/franciscomendes10866/how-to-seed-database-using-typeorm-seeding-4kd5
export default class InitialDatabaseSeed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const em = connection.createEntityManager();

		console.log('Creating Factories');
		const users = await factory(User)().makeMany(2);
		const tasks = await factory(Task)().makeMany(100);
		const comments = await factory(Comment)().makeMany(50);
		const updates = await factory(Update)().makeMany(50);
		const projects = await factory(Project)().makeMany(5);

		console.log('Seeding Tasks');
		await editEntities(em, tasks, (task) => {
			task.creatorId = getRandom(users.length);
			task.projectId = getRandom(projects.length);
			task.members = [{ id: getRandom(users.length) }];
			return task;
		});

		// update projects tasks
		// console.log('Seeding Users');
		// await editEntities(em, users, (user) => {
		// 	user.tasks = [tasks[getRandom(tasks.length)], tasks[getRandom(tasks.length)]];
		// 	return user;
		// });

		console.log('Seeding Comments');
		// Create comments
		await editEntities(em, comments, (comment) => {
			const taskid = getRandom(tasks.length);
			const projectid = getRandom(projects.length);
			comment.projectId = projectid;
			comment.taskId = taskid;
			comment.creatorId = getRandom(users.length);
			return comment;
		});

		console.log('Seeding Projects');
		await editEntities(em, projects, (project) => {
			project.creatorId = getRandom(users.length);
			project.members = [{ id: getRandom(users.length) }];
			project.image = 'https://picsum.photos/600/600';
			project.thumbnail = 'https://picsum.photos/250/250';
			return project;
		});

		console.log('Seeding Updates');
		await editEntities(em, updates, (update) => {
			update.userId = getRandom(users.length);
			update.type = Math.floor(Math.random() * 6);
			update.projectId = getRandom(projects.length);
			update.taskId = getRandom(tasks.length);
			return update;
		});

		console.log('Saving Users');
		await saveEntities(em, users);
		console.log('Saving Projects');
		// await saveEntities(em, projects);
		console.log('Saving Tasks');
		// await saveEntities(em, tasks);
		console.log('Saving Comments');
		// await saveEntities(em, comments);
		console.log('Saving Updates');
		// await saveEntities(em, updates);
	}
}
