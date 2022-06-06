import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Task } from './Task';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	comment: string;

	//
	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({ name: 'creatorId' })
	creator: User;

	@Column({ nullable: false })
	creatorId: number;

	//
	@ManyToOne(() => Task, (task) => task.comments, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'taskId' })
	task: Task;

	@Column({ nullable: false })
	taskId: number;

	@Column('int', { default: Math.round(new Date().getTime() / 1000) })
	created_at: number;

	@Column('int', { nullable: true, default: 0 })
	deleted_at: number;
}
