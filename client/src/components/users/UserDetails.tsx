import { IPhoneNumber, UserObject } from "./UserObject";
import userImage from '../../images/user.png'
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserForDetails } from "./services/UserService";

interface DetailsProps {
    userDetails: UserObject | undefined;
}

const UserDetails = ({userDetails}: DetailsProps) => {
    const[user, setUser] = useState<UserObject | undefined>(userDetails);

    const { id } = useParams<{ id: string }>();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        if(userDetails === undefined) {
            fetchUser();
        }
    }, []);

    const phoneNumber: IPhoneNumber = user && Object.values(user.phoneNumber).pop();

    const goBack = (): void => {
        navigate('/');
    }

    // If userDetails not exist, then fetch by id and store it in userDetails
    const fetchUser = async (): Promise<void> => {
        const user: UserObject = await getUserForDetails(id);
        setUser(user);
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
                {user?.firstName} {user?.lastName}</Typography>
                <br/>
                <Typography variant="subtitle1" gutterBottom>
                Email: {user?.email}
                <br/>
                Phone number: {phoneNumber?.value}
                <br/>
                Type of number: {phoneNumber?.numberType}
                </Typography>
            </div>
        </div>
    );
}
 
export default UserDetails;