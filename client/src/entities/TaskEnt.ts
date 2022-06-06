import User from './UserEnt';
import Update from './UpdateEnt';
import Project from './ProjectEnt';

export default interface Task {
	id: number;
	title: string;
	description: string;
	type: number;
	time_logged: number;
	time_remaining: number;
	priority: number;
	created_at: number;
	deleted_at: number;
	members: User[];
	updates: Update[];
	creator: User;
	creatorId: number;
	project: Project;
	projectId: number;
	comments: Comment[];
}
