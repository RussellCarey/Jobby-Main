import axios from 'axios';
import Cookie from 'js-cookie';
import isDev from '../../../utils/isDev';
import { projectURLS } from '../../../utils/urls';

//? error.repsonse.data has status and so does response.data
export const getUpdates = async () => {
	try {
		const projectUpdates = await axios.request({
			withCredentials: true,
			method: 'GET',
			url: isDev() ? `${projectURLS.development}/api/updates/allForUser` : `/api/updates/allForUser`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return projectUpdates;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const getProject = async () => {
	try {
		const project = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/users/projects` : `/api/users/projects`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return project;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};
