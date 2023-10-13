import { InputAdornment, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const validInput = /^[-0-9]*$/;

interface FindByPhoneNumberProps {
    passSetPhoneNumber: Dispatch<SetStateAction<string>>;
}

const FindByPhoneNumber = ({ passSetPhoneNumber }: FindByPhoneNumberProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handleChange = (event: { target: { value: string; }; }): void => {
        if (validInput.test(event.target.value)) {
            setPhoneNumber(event.target.value);
            if(event.target.value.length > 0){
                passSetPhoneNumber(event.target.value);
            } else {
                passSetPhoneNumber("default");
            }
        }
      };

    return ( 
        <TextField id="outlined-size-small" size="small" value={phoneNumber} variant="outlined" onChange={handleChange} autoComplete="off" placeholder="Phone number"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                < SearchIcon />
                </InputAdornment>
            ),
            }}
  	    />
    );
}
 
export default FindByPhoneNumber;