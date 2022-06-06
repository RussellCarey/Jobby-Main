import Task from './TaskEnt';
import Update from './UpdateEnt';
import Project from './ProjectEnt';

export default interface User {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	thumbnail: string;
	image: string;
	password: string;
	verification_token: string;
	is_verified: boolean;
	deleted_at: number;
	dob: number;
	tasks: Task[];
	projects: Project[];
	updates: Update[];
	created_tasks: Task[];
	created_projects: Project[];
	comments: Comment[];
}
