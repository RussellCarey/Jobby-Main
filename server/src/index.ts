import 'reflect-metadata';
const dotenv = require('dotenv');
dotenv.config();

import isDev from './utils/isDev';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { AppDataSource } from './data-source';

const ErrorController = require('./controller/ErrorController');

import AuthRoutes from './Routes/AuthRoutes';
import UserRoutes from './Routes/UserRoutes';
import TaskRoutes from './Routes/TaskRoutes';
import ProjectRoutes from './Routes/ProjectRoutes';
import UpdateRoutes from './Routes/UpdateRoutes';
import CommentRoutes from './Routes/CommentRoutes';

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app.use(bodyParser.json());

		const whiteListDev = ['localhost:3000', 'http://localhost:3000', 'http://127.0.0.1:3000'];
		const whiteListProd = ['https://jobby.russell-carey.com', 'https://jobby.russell-carey.com/api', 'https://www.jobby.russell-carey.com'];

		app.use(
			cors({
				origin: isDev() ? whiteListDev : whiteListProd,
				credentials: true,
			})
		);

		//
		app.use(express.json({ limit: '10mb' }));
		app.use(express.urlencoded({ extended: false, parameterLimit: 10, limit: '10mb' }));

		// Register express routes from defined application routes
		app.use('/api/users', UserRoutes);
		app.use('/api/auth', AuthRoutes);
		app.use('/api/tasks', TaskRoutes);
		app.use('/api/projects', ProjectRoutes);
		app.use('/api/updates', UpdateRoutes);
		app.use('/api/comments', CommentRoutes);

		// Catch any errors here. Below the routes.
		app.use(ErrorController);

		// start express server
		app.listen(process.env.PORT, () => {
			console.log(`Connected to server ${process.env.PORT}`);
		});
	})
	.catch((error) => console.log(error));
