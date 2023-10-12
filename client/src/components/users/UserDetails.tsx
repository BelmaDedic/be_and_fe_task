import { IPhoneNumber, UserObject } from "./UserObject";
import userImage from '../../images/user.png'
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface DetailsProps {
    userDetails: UserObject | undefined;
}

const UserDetails = ({userDetails}: DetailsProps) => {

    const phoneNumber: IPhoneNumber = userDetails && Object.values(userDetails.phoneNumber).pop();
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    return ( 
        <div className="usersDetailsPage">
            <Button className="back" variant="contained" onClick={goBack} style={{ marginTop: '10px', marginLeft: '20px' }} startIcon={ <KeyboardBackspaceIcon/> }> Back </Button>
            <div className="userDetails" style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)' }}>

                <img className="userImage" src={userImage} alt="user"/>
                <br/>
                <Typography variant="h4" gutterBottom>
                {userDetails?.firstName} {userDetails?.lastName}</Typography>
                <br/>
                <Typography variant="subtitle1" gutterBottom>
                Email: {userDetails?.email}
                <br/>
                Phone number: {phoneNumber.value}
                <br/>
                Type of number: {phoneNumber.numberType}
                </Typography>
            </div>
        </div>
    );
}
 
export default UserDetails;