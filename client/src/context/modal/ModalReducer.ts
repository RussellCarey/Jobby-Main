import { PUSH_MESSAGE, SET_SHOW, SET_TYPE, REMOVE_FROM_QUEUE } from './types';
const { v4: uuidv4 } = require('uuid');

const Reducer = (state: any, action: any) => {
	switch (action.type) {
		case PUSH_MESSAGE:
			return [...state, { ...action.payload, id: uuidv4() }];

		case REMOVE_FROM_QUEUE:
			return state.filter((m: any) => m.id !== action.payload);

		default:
			return state;
	}
};

export default Reducer;
