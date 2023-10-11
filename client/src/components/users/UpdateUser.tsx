import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { pink } from "@mui/material/colors";
import { IPhoneNumber, UserObject } from "./UserObject";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const UpdateUser = () => {

    const[user, setUser] = useState<UserObject>();
    const[name, setName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[phoneNumberValue, setPhoneNumberValue] = useState('');
    const[nameError, setNameError] = useState(false);
    const[lastNameError, setLastNameError] = useState(false);
    const[emailError, setEmailError] = useState(false);
    const[phoneNumberError, setPhoneNumberError] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    const restriction = /^[0-9]?\d*(?:[-]\d*)?(?:[0-9]\d*)?(?:[-]\d*)?(?:[0-9]\d*)?$/;

    
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async() => {
        const fetchUser = await fetch('http://localhost:5000/users/' + id);
        const fetchedUser: UserObject = await fetchUser.json();
        setUser(fetchedUser);
        const phoneNumber: IPhoneNumber = Object.values(fetchedUser.phoneNumber).pop();
        setName(fetchedUser.firstName);
        setLastName(fetchedUser.lastName);
        setEmail(fetchedUser.email);
        setPhoneNumberValue(phoneNumber.value);
    }

    const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPhoneNumberError(false);

        const url = 'http://localhost:5000/users/' + id;
        fetch(url, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                firstName: name,
                lastName: lastName,
                email: email,
                value: phoneNumberValue 
            })
        })
        .then(() => {
            if(name === "") {
                setNameError(true);
            } else if(lastName === "") {
                setLastNameError(true);
            } else if(email === "") {
                setEmailError(true);
            } else if(phoneNumberValue === "") {
                setPhoneNumberError(true);
            } else {
                navigate('/')
            }
        })
    }

    const checkAndSetPhoneNumber = (e: string) => {
        if (restriction.test(e)) {
            setPhoneNumberValue(e);
        }
    }

    return (  
        <div className="update">
            <Link className="linkToBack" to={"/"} style={{textDecoration: 'none', color: 'black'}}> <KeyboardBackspaceIcon/> Back</Link>
            <div className="updateUser" style={{height: "100%"}}>
                <Avatar className="avatar" sx={{ bgcolor: pink[500] }}>
                    < ModeEditOutlineOutlinedIcon/>
                </Avatar>
                <Typography variant="h5" gutterBottom component="div" mb={ 3 } textAlign={"center"} sx={{ cursor: "default" }}>
                    Update user data
                </Typography>
                <div className="formForUpdate">
                    <form onSubmit={updateUser}>
                        <InputLabel className="label">
                            Enter the first name
                        </InputLabel>
                        <TextField fullWidth required id="outlined-required" color="success" label="First name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} error={nameError}/>
                        <br/>
                        <InputLabel className="label">
                            Enter the last name
                        </InputLabel>
                        <TextField fullWidth required id="outlined-required" color="success" label="Last name" autoComplete="off" value={lastName} onChange={(e) => setLastName(e.target.value)} error={lastNameError}/>
                        <br/>
                        <InputLabel className="label">
                            Enter the email
                        </InputLabel>
                        <TextField fullWidth required id="outlined-required" type="email" color="success" label="Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError}/>
                        <br/>
                        <InputLabel className="label">
                            Enter the phone number
                        </InputLabel>
                        <TextField fullWidth required id="outlined-required" label="Phone number" autoComplete="off" helperText="Format: 012-345-6789" value={phoneNumberValue} 
                        onChange={(e) => checkAndSetPhoneNumber(e.target.value)} inputProps={{ minLength: 10, maxLength: 12 }} error={phoneNumberError}/>
                        <br/>
                        <Box textAlign='center'>
                        <Button type="submit" variant="contained" color="success" className="submit">SAVE</Button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default UpdateUser;