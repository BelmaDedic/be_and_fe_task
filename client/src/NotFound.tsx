import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="notFound">
      <p>&#9785;</p>
      <h2>Uuups, wrong url!</h2>

      <Button
        className="back"
        variant="contained"
        onClick={goBack}
        style={{ marginTop: '0' }}
        startIcon={<KeyboardBackspaceIcon />}
      >
        {' '}
        Back{' '}
      </Button>
    </div>
  );
};

export default NotFound;
