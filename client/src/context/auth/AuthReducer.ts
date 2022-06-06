import { SET_USER, SET_IMAGE } from './types';
import Cookie from 'js-cookie';

const Reducer = (state: any, action: any) => {
	switch (action.type) {
		case SET_USER:
			return {
				email: action.payload.email,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				username: action.payload.username,
				id: action.payload.id,
				token: Cookie.get('jwt'),
				projects: action.payload.projects,
				thumbnail: action.payload.thumbnail,
				image: action.payload.image,
			};
		case SET_IMAGE:
			return {
				...state,
				thumbnail: action.payload.thumbnail,
				image: action.payload.image,
			};

		default:
			return state;
	}
};

export default Reducer;
