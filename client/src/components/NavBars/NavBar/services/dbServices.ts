//? error.repsonse.data has status and so does response.data
import axios from 'axios';
import Cookie from 'js-cookie';
import isDev from '../../../../utils/isDev';
import { projectURLS } from '../../../../utils/urls';

export const createProject = async (projectid: number) => {
	try {
		const tasks = await axios.request({
			withCredentials: true,
			method: 'GET',
			url: isDev() ? `${projectURLS.development}/api/projects/${projectid}/tasks` : `api/projects/${projectid}/tasks`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return tasks;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const createTask = async (projectid: number) => {
	try {
		const tasks = await axios.request({
			withCredentials: true,
			method: 'GET',
			url: isDev() ? `${projectURLS.development}/api/projects/${projectid}/tasks` : `api/projects/${projectid}/tasks`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return tasks;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};
