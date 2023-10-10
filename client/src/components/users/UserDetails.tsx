import { IPhoneNumber, UserObject } from "./UserObject";
import userImage from '../../images/user.png'
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface DetailsProps {
    userDetails: UserObject | undefined;
}

const UserDetails = ({userDetails}: DetailsProps) => {

    const phoneNumber: IPhoneNumber = userDetails && Object.values(userDetails.phoneNumber).pop();

    return ( 
        <div className="usersDetails">
        <Link className="linkToBack" to={"/"} style={{textDecoration: 'none', color: 'black'}}> <KeyboardBackspaceIcon/> Back</Link>
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