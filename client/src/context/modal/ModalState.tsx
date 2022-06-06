import { useReducer, useState, useEffect } from 'react';
import ModalReducer from './ModalReducer';
import ModalContext from './ModalContext';
import { PUSH_MESSAGE, REMOVE_FROM_QUEUE } from './types';

export interface IPropsState {
	children: React.ReactNode;
}

const ModalState = (props: IPropsState) => {
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const [messageQueue, dispatch] = useReducer(ModalReducer, []);

	const addMessageToModal = (message: string, type: 'ok' | 'error' | 'success', goBack: boolean) => {
		dispatch({ type: PUSH_MESSAGE, payload: { message, type, goBack } });
	};

	const removeFromQueue = () => {
		dispatch({ type: REMOVE_FROM_QUEUE, payload: messageQueue[0].id });
	};

	const awaitTime = (ms: number) => {
		return new Promise<void>((res, rej) => {
			setTimeout(() => {
				return res();
			}, ms);
		});
	};

	const showModalMessages = async () => {
		// Check that the array has queueu hs messages in it.
		if (messageQueue.length < 1) return;

		// Set modal to show with the message in the state and status.
		setModalStatus(true);

		// Set timeout / promise it await the time needed to show the modal and back.
		await awaitTime(4000);

		// Remove the message from the queueu so it updates and shows anymore if there is some..
		setModalStatus(false);

		removeFromQueue();
	};

	useEffect(() => {
		if (messageQueue.length > 0) showModalMessages();
	}, [messageQueue]);

	return <ModalContext.Provider value={{ modalStatus, setModalStatus, messageQueue, addMessageToModal }}>{props.children}</ModalContext.Provider>;
};

export default ModalState;
