import { InputAdornment, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface FindByEmailProps {
  passSetEmail: Dispatch<SetStateAction<string>>;
}

// Input for search by user's email
const FindByEmail = ({ passSetEmail }: FindByEmailProps) => {
  const [email, setEmail] = useState<string>('');

  const handleChange = (event: { target: { value: string } }): void => {
    setEmail(event.target.value);
    if (event.target.value.length > 0) {
      passSetEmail(event.target.value);
    } else {
      passSetEmail('default');
    }
  };

  return (
    <TextField
      id="outlined-size-small"
      size="small"
      value={email}
      placeholder="Email"
      variant="outlined"
      onChange={handleChange}
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FindByEmail;
