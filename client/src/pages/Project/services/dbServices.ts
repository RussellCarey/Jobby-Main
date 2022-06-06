//? error.repsonse.data has status and so does response.data
import axios from 'axios';
import Cookie from 'js-cookie';
import isDev from '../../../utils/isDev';
import { projectURLS } from '../../../utils/urls';

export const getTaskData = async (taskid: number, projectid: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}` : `/api/tasks/${projectid}/${taskid}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const getTaskComments = async (taskid: number, projectid: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'GET',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}/comments` : `/api/tasks/${projectid}/${taskid}/comments`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const getTaskUpdates = async (taskid: number, projectid: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'GET',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}/updates` : `/api/tasks/${projectid}/${taskid}/updates`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const getTaskMembers = async (taskid: number, projectid: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}/members` : `/api/tasks/${projectid}/${taskid}/members`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

//!!!!!!!!!
export const removeMember = async (taskid: number, projectid: number, memberid: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'PATCH',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}/members` : `/api/tasks/${projectid}/${taskid}/members`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
			data: {
				memberid,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const getProjectMembers = async (projectid: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'GET',
			url: isDev() ? `${projectURLS.development}/api/projects/${projectid}/members` : `/api/projects/${projectid}/members`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const deleteTask = async (taskid: number, projectid: number) => {
	console.log('Deelteing task');
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'DELETE',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}` : `/api/tasks/${projectid}/${taskid}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

// id, comment, creator, creatorId, task, taskId, project, projectId, created_at, deleted_at
export const addComment = async (taskId: number, projectId: number, comment: string, userId: number) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/comments/add/${projectId}/${taskId}` : `/api/comments/add/${projectId}/${taskId}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
			data: {
				taskId,
				comment,
				creatorId: userId,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const changeTimes = async (taskId: number, projectid: number, timeLogged: number | null, timeRemaining: number | null) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskId}/changeTimes` : `/api/tasks/${projectid}/${taskId}/changeTimes`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
			data: {
				timeLogged,
				timeRemaining,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const addNewTaskData = async (projectid: number, taskData: any) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}` : `/api/tasks/${projectid}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
			data: {
				...taskData,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const updateTaskData = async (taskid: number, projectid: number, taskData: any) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'PATCH',
			url: isDev() ? `${projectURLS.development}/api/tasks/${projectid}/${taskid}` : `/api/tasks/${projectid}/${taskid}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
			data: {
				...taskData,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const searchAllMembers = async (string: string) => {
	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/users/search` : `/api/users/search`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
			},
			data: {
				string,
			},
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const updateUserImage = async (imageFile: File) => {
	const data = new FormData();
	data.append('image', imageFile, `${imageFile.name}`);

	try {
		const userImage = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/users/userimage` : `/api/users/userimage`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
				'Content-Type': 'multipart/form-data',
			},
			data,
		});

		return userImage;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const createProject = async (projectData: any, imageFile: File) => {
	const data = new FormData();
	data.append('image', imageFile, `${imageFile.name}`);
	data.append('name', `${projectData.name}`);
	data.append('description', `${projectData.description}`);

	try {
		const task = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/projects/new` : `/api/projects/new`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
				'Content-Type': 'multipart/form-data',
			},
			data,
		});

		return task;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const addUserToProject = async (projectid: number, userid: number) => {
	try {
		const userImage = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev() ? `${projectURLS.development}/api/projects/${projectid}/addmember/${userid}` : `/api/projects/${projectid}/removemember/${userid}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
				'Content-Type': 'multipart/form-data',
			},
		});

		return userImage;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};

export const removeUserFromProject = async (projectid: number, userid: number) => {
	try {
		const userImage = await axios.request({
			withCredentials: true,
			method: 'POST',
			url: isDev()
				? `${projectURLS.development}/api/projects/${projectid}/removemember/${userid}`
				: `/api/projects/${projectid}/removemember/${userid}`,
			headers: {
				jwt: `${Cookie.get('jwt')}`,
				'Content-Type': 'multipart/form-data',
			},
		});

		return userImage;
	} catch (error: any) {
		console.log(error.response);
		return error.response;
	}
};
