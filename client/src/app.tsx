import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import AuthState from './context/auth/AuthState';
import ModalState from './context/modal/ModalState';

export default function App() {
	return (
		<AuthState>
			<ModalState>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</ModalState>
		</AuthState>
	);
}
