import { Avatar, Box, Button, InputLabel,TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { pink } from "@mui/material/colors";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddUser = () => {  
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

    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPhoneNumberError(false);

        const url = 'http://localhost:5000/users/';
        fetch(url, {
            method: 'POST',
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

    const goBack = () => {
        navigate('/');
    }

    return (  
        <div className="add">
            <Button className="back" variant="contained" onClick={goBack} style={{ marginTop: '10px', marginLeft: '20px' }} startIcon={ <KeyboardBackspaceIcon/> }> Back </Button>            
            <div className="addUser" style={{height: "100%"}}>
                <Avatar className="avatar" sx={{ bgcolor: pink[500] }}>
                    < AddCircleOutlineIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom component="div" mb={ 3 } textAlign={"center"} sx={{ cursor: "default" }}>
                    Add new user
                </Typography>
                <div className="formForaddUser">
                    <form onSubmit={addUser}>
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
                        <Button type="submit" variant="contained" color="success" className="submit">ADD USER</Button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AddUser;