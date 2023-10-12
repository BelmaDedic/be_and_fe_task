import { IPhoneNumber, UserObject } from './UserObject';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';
import DeleteUserDialog from './DeleteUserDialog';

interface CardProps {
    user: UserObject;
    handleUserDetails: (user: UserObject) => void
    handleSetUsers: Dispatch<SetStateAction<UserObject[]>>;
}

const UserCards = ( {user, handleUserDetails, handleSetUsers} : CardProps ) => {

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>(''); // Store the user ID to be deleted

    const navigate = useNavigate();
    const phoneNumber: IPhoneNumber = Object.values(user.phoneNumber).pop();

    const getDetails = (user: UserObject) => {
        handleUserDetails(user);
        navigate(`/UserDetails/${user._id}`);
    }

    const updateUser = (id: string) => {
        navigate(`/updateUser/${id}`);
    };

    const handleDeleteUser = (userId: string) => {
        setUserId(userId);
        setDialogOpen(true);
    };

    return ( 
        <Card className="frame" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title style={{textAlign: 'center'}}> { user.firstName } {user.lastName} </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Email: { user.email } </ListGroup.Item>
                <ListGroup.Item>Phone number: { phoneNumber.value } </ListGroup.Item>
                <ListGroup.Item>Type of number: { phoneNumber.numberType } </ListGroup.Item>
                <ListGroup.Item style={{textAlign: 'center'}}>
                    <Button size="small" variant="outlined"  startIcon={ <InfoOutlinedIcon/> } onClick={() => getDetails(user)}>Details</Button>
                </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <div className="deleteAndUpdate">
                    <p className="deleteButton" onClick={() => handleDeleteUser(user._id)}>
                        <DeleteIcon />
                    </p>
                    <p className="updateButton" onClick={() => updateUser(user._id)}> {" "}
                        <EditIcon />
                    </p>
                    <DeleteUserDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} userId={userId} handleSetUsers={handleSetUsers}/>
                </div>
            </Card.Body>
        </Card>
    );
}
 
export default UserCards;