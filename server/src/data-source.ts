import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.PROD_DB_HOST,
	port: parseInt(process.env.PROD_DB_PORT),
	username: process.env.PROD_DB_USERNAME,
	password: process.env.PROD_DB_PW,
	database: process.env.PROD_DB_NAME,
	synchronize: true,
	logging: false,
	entities: ['src/entity/**/*.ts'],
	migrations: [__dirname + '/migration/**/*.ts'],
	subscribers: [],
});

// DROP TABLE comment, task, project, update, project_members_user, task_members_user, user_updates_update CASCADE
