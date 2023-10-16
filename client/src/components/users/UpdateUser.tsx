import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { pink } from '@mui/material/colors';
import { IPhoneNumber, UserObject } from './dataTypes/UserObject';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { phoneNumberTypeEnum } from './dataTypes/PhoneNumberTypeEnum';
import {
  getUserDetailsForUpdate,
  getDetailsForUpdateUser,
  chechIfEmailExists,
} from './services/UserService';
import { InfoOutlined } from '@mui/icons-material';

const UpdateUser = () => {
  const [user, setUser] = useState<UserObject>();
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumberType, setPhoneNumberType] = useState<string>(
    phoneNumberTypeEnum.PRIMARY.toString()
  );
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberTypeError, setPhoneNumberTypeError] =
    useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [ifEmailExists, setEmailExists] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const restriction: RegExp = /^[0-9\-\/]*$/;

  useEffect((): void => {
    fetchUser();
  }, []);

  useEffect(() => {
    handleButtonDisabled()
  }, [emailError, phoneNumberError, nameError, lastNameError, ifEmailExists])

  const fetchUser = async (): Promise<void> => {
    const user: UserObject = await getUserDetailsForUpdate(id);
    setUser(user);
    const phoneNumber: IPhoneNumber = Object.values(user.phoneNumber).pop();
    setName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhoneNumberType(phoneNumber.numberType);
    setPhoneNumberValue(phoneNumber.value);
  };

  const handleEmail = async (email: string): Promise<void> => {
    const ifExists: boolean = await chechIfEmailExists(email);
    setEmail(email);

    if(ifExists && user?.email === email) {
      setEmailExists(false);
      setEmailError(false);
    } else {
      setEmailExists(ifExists);
      setEmailError(ifExists);
    }
  };

  const updateUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPhoneNumberError(false);
    setPhoneNumberTypeError(false);

    getDetailsForUpdateUser(
      id,
      name,
      lastName,
      email,
      phoneNumberType,
      phoneNumberValue
    );
    
    if (name === '') {
      setNameError(true);
    } else if (lastName === '') {
      setLastNameError(true);
    } else if (email === '') {
      setEmailError(true);
    } else if (phoneNumberType === '') {
      setPhoneNumberTypeError(true);
    } else if (phoneNumberValue === '') {
      setPhoneNumberError(true);
    } else {
      navigate('/');
    }
  };

  const primaryPhoneNumberFormatting = (input: string): string => {
    // Remove any non-numeric characters from the input
    const phoneNumber: string = input.replace(/\D/g, '');

    // Check if the input is empty or exceeds 10 digits
    if (phoneNumber.length === 0) {
      input = '';
    } else if (phoneNumber.length <= 10) {
      // Format the phone number as XXX-XXX-XXXX
      let formattedNumber: string = phoneNumber.slice(0, 3);
      if (phoneNumber.length > 3) {
        formattedNumber += '-' + phoneNumber.slice(3, 6);
      }
      if (phoneNumber.length > 6) {
        formattedNumber += '-' + phoneNumber.slice(6, 10);
      }
      input = formattedNumber;
    } else {
      // If the input exceeds 10 digits, truncate it
      input = phoneNumber.slice(0, 10);
    }
    return input;
  };

  const secondaryPhoneNumberFormatting = (input: string): string => {
    // Remove any non-numeric characters from the input
    const phoneNumber: string = input.replace(/\D/g, '');

    // Check if the input is empty or exceeds 9 digits
    if (phoneNumber.length === 0) {
      input = '';
    } else if (phoneNumber.length <= 9) {
      // Format the phone number as XXX-XXX-XXXX
      let formattedNumber: string = phoneNumber.slice(0, 3);
      if (phoneNumber.length > 3) {
        formattedNumber += '/' + phoneNumber.slice(3, 6);
      }
      if (phoneNumber.length > 6) {
        formattedNumber += '-' + phoneNumber.slice(6, 9);
      }
      input = formattedNumber;
    } else {
      // If the input exceeds 9 digits, truncate it
      input = phoneNumber.slice(0, 9);
    }
    return input;
  };

  const checkAndSetPhoneNumber = (e: string): void => {
    if (restriction.test(e)) {
      if (phoneNumberType === phoneNumberTypeEnum.PRIMARY) {
        setPhoneNumberValue(primaryPhoneNumberFormatting(e));
      } else {
        setPhoneNumberValue(secondaryPhoneNumberFormatting(e));
      }
    }
  };

  const goBack = (): void => {
    navigate('/');
  };

  const renderHelperText = (phoneNumberType: string): string => {
    return phoneNumberType === phoneNumberTypeEnum.PRIMARY
      ? 'Format: 012-345-6789'
      : 'Format: 012/345-678';
  };

  const lengthOfPhoneNumber = (phoneNumberType: string): number => {
    if (phoneNumberType === phoneNumberTypeEnum.PRIMARY.toString()) {
      return 12;
    } else {
      return 11;
    }
  };

  const checkAndSetPhoneNumberType = (phoneNumberType: string): void => {
    setPhoneNumberType(phoneNumberType);
    setPhoneNumberValue('');
    checkAndSetPhoneNumber(phoneNumberType);
  };

  const handleButtonDisabled = (): void => {
    const isDisabled: boolean = emailError || phoneNumberError || nameError || lastNameError || ifEmailExists;
    setButtonDisabled(isDisabled);
  }

  return (
    <div className="update">
      <Button
        className="back"
        variant="contained"
        onClick={goBack}
        style={{ marginTop: '10px', marginLeft: '20px' }}
        startIcon={<KeyboardBackspaceIcon />}
      >
        {' '}
        Back{' '}
      </Button>
      <div className="updateUser" style={{ height: '100%' }}>
        <Avatar className="avatar" sx={{ bgcolor: pink[500] }}>
          <ModeEditOutlineOutlinedIcon />
        </Avatar>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          mb={3}
          textAlign={'center'}
          sx={{ cursor: 'default' }}
        >
          Update user data
        </Typography>
        <div className="formForUpdate">
          <form onSubmit={updateUser}>
            <InputLabel className="label">Enter the first name</InputLabel>
            <TextField
              fullWidth
              required
              id="outlined-required"
              color="success"
              label="First name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
            />
            <br />
            <InputLabel className="label">Enter the last name</InputLabel>
            <TextField
              fullWidth
              required
              id="outlined-required"
              color="success"
              label="Last name"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={lastNameError}
            />
            <br />
            <InputLabel className="label">Enter the email</InputLabel>
            <TextField
              fullWidth
              required
              id="outlined-required"
              type="email"
              color="success"
              label="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              error={emailError}
            />
            {ifEmailExists && (
              <FormHelperText>
                <InfoOutlined />
                Opps! Email already exist.
              </FormHelperText>
            )}
            <InputLabel className="label">
              Select a phone number type
            </InputLabel>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Phone number type
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={phoneNumberType}
                label="Phone number type"
                error={phoneNumberTypeError}
                onChange={(event) =>
                  checkAndSetPhoneNumberType(event.target.value)
                }
              >
                <MenuItem value={'primary'} selected>
                  {phoneNumberTypeEnum.PRIMARY}
                </MenuItem>
                <MenuItem value={'secondary'}>
                  {phoneNumberTypeEnum.SECONDARY}
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            {phoneNumberType && (
              <>
                <InputLabel className="label">
                  Enter the phone number
                </InputLabel>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Phone number"
                  autoComplete="off"
                  helperText={renderHelperText(phoneNumberType)}
                  value={phoneNumberValue}
                  onChange={(e) => checkAndSetPhoneNumber(e.target.value)}
                  inputProps={{
                    minLength: lengthOfPhoneNumber(phoneNumberType),
                    maxLength: lengthOfPhoneNumber(phoneNumberType),
                  }}
                  error={phoneNumberError}
                />
                <br />
                <Box textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="submit"
                    disabled={isButtonDisabled}
                  >
                    SAVE
                  </Button>
                </Box>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
