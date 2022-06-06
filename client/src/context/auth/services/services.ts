import axios from 'axios';
import Cookie from 'js-cookie';
import isDev from '../../../utils/isDev';
import { projectURLS } from '../../../utils/urls';

export const getUserData = async () => {
	// Get user to put onto the state.. ------- move this to servies..
	const foundUser = await axios.request({
		withCredentials: true,
		method: 'POST',
		url: isDev() ? `${projectURLS.development}/api/auth/check` : `/api/auth/check`,
		headers: {
			jwt: `${Cookie.get('jwt')}`,
		},
	});

	return foundUser;
};

export const logoutUser = async () => {
	// Get user to put onto the state.. ------- move this to servies..
	const logout = await axios.request({
		withCredentials: true,
		method: 'POST',
		url: isDev() ? `${projectURLS.development}/api/auth/logout` : `/api/auth/logout`,
		headers: {
			jwt: `${Cookie.get('jwt')}`,
		},
	});

	return logout;
};
