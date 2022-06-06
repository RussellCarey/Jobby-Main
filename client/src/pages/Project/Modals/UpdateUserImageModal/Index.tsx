import { useState, useContext, createRef } from 'react';
import * as Styled from '../../../../styled/shared-modal-styles';
import AuthContext from '../../../../context/auth/AuthContext';
import ModalContext from '../../../../context/modal/ModalContext';
import { updateUserImage } from '../../services/dbServices';
import { checkImageIsEven } from '../CreateProject/utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import { projectURLS } from '../../../../utils/urls';
import Loading from '../../../../components/Loading/Index';

export default function UpdateUserImageModal() {
	const navigate = useNavigate();
	const { userState, updateUserImageState } = useContext(AuthContext);
	const { addMessageToModal } = useContext(ModalContext);
	const fileInput = createRef<HTMLInputElement>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [newImage, setNewImage] = useState<File>();
	const [newImageURL, setNewImageURL] = useState<string>();

	const imageOnChange = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		const objectUrl = URL.createObjectURL(fileInput.current!.files![0]);
		setNewImage(target.files![0]);
		setNewImageURL(objectUrl);
	};

	const submitNewUserImage = async () => {
		if (fileInput!.current!.files!.length > 0) {
			setIsLoading(true);
			const objectUrl = URL.createObjectURL(fileInput.current!.files![0]);
			const imageIsEven = await checkImageIsEven(objectUrl);

			if (!imageIsEven) return addMessageToModal('Image needs to have even dimensions.', 'error');
			if (!newImage) return addMessageToModal('Please choose a new image.', 'error');

			const userImage = await updateUserImage(newImage);
			if (userImage.data.status !== 'success') return addMessageToModal('Image not uploaded. Please try again.', 'error');

			setIsLoading(false);
			// Update the image in the UI if the upload is successful..
			updateUserImageState(userImage.data.data.thumbnail, userImage.data.data.image);
			addMessageToModal('Image uploaded sucessfully!', 'success');
		}
	};

	return (
		<Styled.BackgroundContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
			{isLoading ? <Loading /> : null}
			<Styled.ColumnContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
				<Styled.TitleText>Account</Styled.TitleText>

				{/* Current user image */}
				<Styled.ImagePreview src={newImageURL || `${projectURLS.image}/${userState.thumbnail}` || '/images/unknown-user.png'} alt="user icon" />

				{/* Find image to use as new user image */}
				<Styled.FormContainer>
					<Styled.FileInput ref={fileInput} id="image" accept={'image/png, image/jpeg'} type={'file'} onChange={(e) => imageOnChange(e)} />
					<Styled.Description>Change your user.</Styled.Description>
				</Styled.FormContainer>

				{/* Submit Image change */}
				<Styled.ButtonContainer>
					<Styled.Button onClick={submitNewUserImage}>Upload Image</Styled.Button>
					<Styled.CancelText onClick={() => navigate(-1)}>Cancel</Styled.CancelText>
				</Styled.ButtonContainer>
			</Styled.ColumnContainer>
		</Styled.BackgroundContainer>
	);
}
