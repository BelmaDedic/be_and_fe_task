import { IPhoneNumber, UserObject } from './UserObject';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';

interface CardProps {
    user: UserObject;
    handleUserDetails: (user: UserObject) => void
}

const UserCards = ( {user, handleUserDetails} : CardProps ) => {

    const navigate = useNavigate();

    const getDetails = (user: UserObject) => {
        handleUserDetails(user);
        navigate("/UserDetails");
    }

    const phoneNumber: IPhoneNumber = Object.values(user.phoneNumber).pop();
    return ( 
        <Card className="frame" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}> { user.firstName } {user.lastName} </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Email: { user.email } </ListGroup.Item>
                        <ListGroup.Item>Phone number: { phoneNumber.value } </ListGroup.Item>
                        <ListGroup.Item>Type of number: { phoneNumber.numberType } </ListGroup.Item>
                        <ListGroup.Item style={{textAlign: 'center'}}>
                            <Button size="small" variant="outlined"  startIcon={ <InfoOutlinedIcon/> } 
                            onClick={() => getDetails(user)}>Details</Button>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                    <div className="deleteAndUpdate">
                      <p className="delete">
                        <DeleteIcon />
                      </p>
                      <p className="update">
                        {" "}
                        <EditIcon />
                      </p>
                      
                    </div>
                        
                        {/* <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                </Card>
     );
}
 
export default UserCards;