import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebsiteMain from '../pages/Website/Index';
import Dashboard from '../pages/Dashboard/Index';
import Project from '../pages/Project/Index';
import JobViewModal from '../pages/Project/Modals/JobView/Index';
import JobFormModal from '../pages/Project/Modals/JobForm/Index';
import CreateProjectModal from '../pages/Project/Modals/CreateProject/Index';
import AddProjectMemberModal from '../pages/Project/Modals/ManageProjectMembers/Index';
import UpdateUserImageModal from '../pages/Project/Modals/UpdateUserImageModal/Index';
import { IsLoggedInRoute } from './ProtectedRoutes';

import ModalContext from '../context/modal/ModalContext';
import MainModal from '../components/MainModal/Index';

const Router = () => {
	const { modalStatus, messageQueue } = useContext(ModalContext);
	return (
		<>
			{modalStatus ? <MainModal messageQueue={messageQueue} /> : null}
			
			<Routes>
				<Route path="/" element={<WebsiteMain />}></Route>

				<Route element={<IsLoggedInRoute />}>
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="/dashboard/create" element={<CreateProjectModal />} />
						<Route path="/dashboard/account" element={<UpdateUserImageModal />} />
					</Route>

					<Route path="/project/:projectid" element={<Project />}>
						<Route path="/project/:projectid/create" element={<CreateProjectModal />} />
						<Route path="/project/:projectid/createtask" element={<JobFormModal type="create" />} />
						<Route path="/project/:projectid/addmember" element={<AddProjectMemberModal />} />
						<Route path="/project/:projectid/account" element={<UpdateUserImageModal />} />

						<Route path="/project/:projectid/task/:taskid" element={<JobViewModal />}>
							<Route path="/project/:projectid/task/:taskid/edit" element={<JobFormModal type="edit" />} />
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<WebsiteMain />} />
			</Routes>
		</>
	);
};

export default Router;
