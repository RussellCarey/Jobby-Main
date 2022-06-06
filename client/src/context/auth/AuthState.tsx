import { useReducer } from 'react';
import Cookie from 'js-cookie';

import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';

import { getUserData, logoutUser } from './services/services';
import { SET_USER, SET_IMAGE } from './types';

import UserEnt from '../../entities/UserEnt';

export interface IPropsState {
	children: React.ReactNode;
}

//
const AuthState = (props: IPropsState) => {
	const [userState, dispatch] = useReducer(AuthReducer, {});

	const setUser = (user: UserEnt) => {
		dispatch({ type: SET_USER, payload: user });
	};

	const checkLoggedIn = async () => {
		try {
			// Check we have a cookie, if not we are not logged in.
			if (!Cookie.get('jwt')) return;

			//If there is a cookie but no saved user, grab user data and save in storage..
			if (!userState.id) {
				const foundUser = await getUserData();
				console.log(foundUser);

				// If error remove all trace of the user and ask the user to re-login.
				if (foundUser.data.status !== 'success') {
					Cookie.remove('jwt');
					return;
				}

				setUser(foundUser.data.data);
			}
		} catch (error: any) {
			Cookie.remove('jwt');
		}
	};

	const updateUserImageState = (thumbnail: string, image: string) => {
		dispatch({ type: SET_IMAGE, payload: { thumbnail, image } });
	};

	const logout = async () => {
		const logoutAttempt = await logoutUser();
		return logoutAttempt;
	};

	return (
		<AuthContext.Provider
			value={{
				userState,
				checkLoggedIn,
				setUser,
				updateUserImageState,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
