import { FunctionComponent } from 'react';
import * as TimeTrackerStyled from './styled';
import * as ModalStyled from '../../../../../styled/shared-modal-styles';
import Icon from '../../../../../components/Icon/Index';

interface ITimeTracker {
	percentage: number;
	timeRemaining: number;
	timeLogged: number;
	setShowTimeEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeTracker: FunctionComponent<ITimeTracker> = ({ percentage, timeRemaining, timeLogged, setShowTimeEdit }) => {
	return (
		<TimeTrackerStyled.TimeTrackerContainer>
			<TimeTrackerStyled.SpacedAreas>
				<ModalStyled.CapitalText>TIME TRACKER</ModalStyled.CapitalText>
				<ModalStyled.CancelText onClick={() => setShowTimeEdit(true)}>Edit</ModalStyled.CancelText>
			</TimeTrackerStyled.SpacedAreas>

			<TimeTrackerStyled.SpacedAreas>
				<Icon name="clock-solid" type="dark" size="15px" left={true} text={''} />
				<TimeTrackerStyled.TimeTrackerBG>
					<TimeTrackerStyled.TimeTrackerColor percentage={(timeLogged / (timeLogged + timeRemaining)) * 100} />
				</TimeTrackerStyled.TimeTrackerBG>
			</TimeTrackerStyled.SpacedAreas>

			<TimeTrackerStyled.SpacedAreas>
				<ModalStyled.SmallText>{timeLogged} hrs logged</ModalStyled.SmallText>
				<ModalStyled.SmallText>{timeRemaining} hrs remaining</ModalStyled.SmallText>
			</TimeTrackerStyled.SpacedAreas>
		</TimeTrackerStyled.TimeTrackerContainer>
	);
};

export default TimeTracker;
