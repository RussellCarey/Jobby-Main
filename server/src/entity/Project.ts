import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { Task } from './Task';
import { User } from './User';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, unique: true })
	name: string;

	@Column({ nullable: false })
	thumbnail: string;

	@Column({ nullable: false })
	image: string;

	@Column({ nullable: false })
	description: string;

	@OneToMany(() => Task, (task) => task.project)
	tasks: Task[];

	@ManyToOne(() => User, (user) => user.created_projects, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'creatorId' })
	creator: User;

	@Column('int')
	creatorId: number;

	@ManyToMany(() => User, (user) => user.projects, { cascade: true })
	@JoinTable()
	members: User[];

	@Column('int', { nullable: false, default: Math.round(new Date().getTime() / 1000) })
	created_at: number;
}
