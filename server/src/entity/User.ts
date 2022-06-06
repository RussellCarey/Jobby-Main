import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, Index } from 'typeorm';
import { Task } from './Task';
import { Project } from './Project';
import { Comment } from './Comment';
import { Update } from './Update';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	firstName: string;

	@Column({ nullable: false })
	lastName: string;

	@Index()
	@Column({ nullable: false, unique: true })
	username: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: true })
	thumbnail: string;

	@Column({ nullable: true })
	image: string;

	@Column({ nullable: false, select: false })
	password: string;

	@Column({ nullable: false, default: uuidv4() })
	verification_token: string;

	@Column({ nullable: false, default: false })
	is_verified: boolean;

	@Column('int', { nullable: false, default: 0 })
	deleted_at: number;

	@Column({ type: 'int', nullable: false })
	dob: number;

	@ManyToMany(() => Task, (task) => task.members)
	tasks: Task[];

	@ManyToMany(() => Project, (project) => project.members)
	projects: Project[];

	@ManyToMany(() => Update, (update) => update.user)
	@JoinTable()
	updates: Update[];

	@OneToMany(() => Task, (task) => task.creator)
	created_tasks: Task[];

	@OneToMany(() => Project, (project) => project.creator, { onDelete: 'CASCADE' })
	created_projects: Project[];

	@OneToMany(() => Comment, (comment) => comment.creator)
	comments: Comment[];
}
