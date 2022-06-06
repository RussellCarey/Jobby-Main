import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Task } from './Task';
import { User } from './User';

// Update types:
// 0 - Added Task
// 1 - Deleted Task
// 2 - Edited Task
// 3 - Commented
// 4 - Changed Completion Time
// 5 - Added logged Time

@Entity()
export class Update {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.updates)
	@JoinColumn({ name: 'userId' })
	user: User;

	@Column('int', { nullable: false })
	userId: number;

	@Column('int', { nullable: false })
	type: number;

	//
	@ManyToOne(() => Task, (task) => task.updates, { onDelete: 'CASCADE', nullable: true })
	@JoinColumn({ name: 'taskId' })
	task: Task;

	@Column('int', { nullable: true })
	taskId: number;

	@Column('int', { nullable: false })
	date: number;

	@Column('int', { nullable: true, default: 0 })
	deleted_at: number;
}
