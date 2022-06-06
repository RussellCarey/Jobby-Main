import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { Update } from './Update';
import { Comment } from './Comment';

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	title: string;

	@Column({ nullable: false })
	description: string;

	@Column('int')
	type: number;

	@Column({ nullable: false, default: 0 })
	time_logged: number;

	@Column({ nullable: false, default: 0 })
	time_remaining: number;

	@Column('int')
	priority: number;

	@Column('int', { default: Math.round(new Date().getTime() / 1000) })
	created_at: number;

	@Column({ nullable: false, type: 'int', default: 0 })
	deleted_at: number;

	@ManyToMany(() => User, (user) => user.tasks, { cascade: true })
	@JoinTable()
	members: User[];

	@OneToMany(() => Update, (update) => update.task)
	updates: Update[];

	//
	@ManyToOne(() => User, (user) => user.created_tasks)
	@JoinColumn({ name: 'creatorId' })
	creator: User;

	@Column('int')
	creatorId: number;

	//
	@ManyToOne(() => Project, (project) => project.tasks, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'projectId' })
	project: Project;

	@Column('int')
	projectId: number;

	@OneToMany(() => Comment, (comment) => comment.task)
	comments: Comment[];
}
