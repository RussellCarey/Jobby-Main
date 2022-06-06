export interface IModal {
	setShowModal: React.Dispatch<React.SetStateAction<'login' | 'forgot' | 'signup' | null>>;
}

export interface ISignUpUser {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	dob: number;
}
