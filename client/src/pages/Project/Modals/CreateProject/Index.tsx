import { useState, ChangeEvent, createRef, useContext } from 'react';
import * as Styled from '../../../../styled/shared-modal-styles';
import { createProject } from '../../services/dbServices';
import { useNavigate } from 'react-router-dom';
import { checkImageIsEven } from './utils/imageUtils';
import ModalContext from '../../../../context/modal/ModalContext';
import Button from '../../../../components/Button/Index';

const CreateProject = () => {
	const navigate = useNavigate();
	const { addMessageToModal } = useContext(ModalContext);
	const fileInput = createRef<HTMLInputElement>();

	const [projectImage, setProjectImage] = useState<File>();
	const [projectImageURL, setProjectImageURL] = useState<string>();
	const [projectDetails, setprojectDetails] = useState({
		name: '',
		description: '',
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setprojectDetails({ ...projectDetails, [target.id]: target.value });
	};

	const imageOnChange = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;

		const objectUrl = URL.createObjectURL(fileInput.current!.files![0]);

		setProjectImage(target.files![0]);
		setProjectImageURL(objectUrl);
	};

	const submitCreateProject = async () => {
		const objectUrl = URL.createObjectURL(fileInput.current!.files![0]);
		const imageIsEven = await checkImageIsEven(objectUrl);

		if (!imageIsEven) return addMessageToModal('Image must be the same width and height.', 'error');
		if (!projectImage) return addMessageToModal('Please add an image.', 'error');

		const project = await createProject(projectDetails, projectImage);
		if (project.data.status !== 'success') return addMessageToModal('Error saving project', 'error');
		addMessageToModal('Your project was created.');
	};

	return (
		<Styled.BackgroundContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
			<Styled.ColumnContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
				<Styled.TitleText>Create new project.</Styled.TitleText>

				{projectImage ? <Styled.ImagePreview src={projectImageURL} /> : null}
				{/* Find image to use as thumbnail */}
				<Styled.FormContainer>
					<Styled.FileInput ref={fileInput} id="image" accept={'image/png, image/jpeg'} type={'file'} onChange={(e) => imageOnChange(e)} />
					<Styled.Description>Select a project image.</Styled.Description>
				</Styled.FormContainer>

				{/* Enter name */}
				<Styled.FormContainer>
					<Styled.FormInput placeholder="Cool name here.." id="name" value={projectDetails.name} onChange={(e) => onChange(e)} />
					<Styled.Description>Enter a project name..</Styled.Description>
				</Styled.FormContainer>

				{/* Enter description */}
				<Styled.FormContainer>
					<Styled.FormInput placeholder="Cool tagline here.." id="description" value={projectDetails.description} onChange={(e) => onChange(e)} />
					<Styled.Description>Enter a tagline..</Styled.Description>
				</Styled.FormContainer>

				<Styled.ButtonContainer>
					<Button text="Create" light={true} onClick={submitCreateProject} />
					<Styled.CancelText onClick={() => navigate(-1)}>Cancel</Styled.CancelText>
				</Styled.ButtonContainer>
			</Styled.ColumnContainer>
		</Styled.BackgroundContainer>
	);
};

export default CreateProject;
