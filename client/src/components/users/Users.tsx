import { useState, useEffect } from 'react';
import { UserObject } from './dataTypes/UserObject';
import Button from '@mui/material/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import FindByEmail from './FindByEmail';
import FindByPhoneNumber from './FindByPhoneNumber';
import PaginatedList from './PaginatedList';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { getAllUsers, searchUsers } from './services/UserService';

interface UserProps {
  handleUserDetails: (user: UserObject) => void;
}

const Users = ({ handleUserDetails }: UserProps) => {
  const [users, setUsers] = useState<UserObject[]>([]);
  const [email, setEmail] = useState<string>('default');
  const [phoneNumber, setPhoneNumber] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchList, setSearchList] = useState<boolean>(true);

  const itemsPerPage: number = 4;
  let totalItems: number = users.length;

  let indexOfLastItem: number = currentPage * itemsPerPage;
  let indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  let currentData = users.slice(indexOfFirstItem, indexOfLastItem);

  const navigate: NavigateFunction = useNavigate();

  useEffect((): void => {
    fetchUsers();
  }, []);

  useEffect(() => {
    totalItems = users.length;

    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentData = users.slice(indexOfFirstItem, indexOfLastItem);
    if (currentPage > 1 && (currentPage - 1) * itemsPerPage === totalItems) {
      setCurrentPage(currentPage - 1);
    }
  }, [users, setCurrentPage]);

  useEffect(() => {
    const delayDebounceFn: NodeJS.Timeout = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  useEffect(() => {
    const delayDebounceFn: NodeJS.Timeout = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [phoneNumber]);

  const fetchUsers = async (): Promise<void> => {
    const users: UserObject[] = await getAllUsers();
    setUsers(users);
  };

  const handleSearch = async (): Promise<void> => {
    if (email !== 'default' || phoneNumber !== 'default') {
      const users: UserObject[] = await searchUsers(email, phoneNumber);
      setUsers(users);
      if (users.length !== 0) {
        setSearchList(true);
      } else {
        setSearchList(false);
      }
    } else if (email === 'default' || phoneNumber === 'default') {
      fetchUsers();
    }
  };

  const addUser = (): void => {
    navigate('/AddUser');
  };

  return (
    <div className="users">
      <div className="home">
        <div className="leftComponentAddUser">
          <Button variant="outlined" onClick={addUser}>
            Add user
          </Button>
        </div>
        <div className="right-componentsSearch">
          <div className="searchByEmail">
            <FindByEmail passSetEmail={setEmail} />
          </div>
          <div className="searchByPhoneNumber">
            <FindByPhoneNumber passSetPhoneNumber={setPhoneNumber} />
          </div>
        </div>
      </div>
      <div className="title">
        <p> Users </p>
      </div>
      {searchList && (
        <div className="homePagination">
          {users && (
            <PaginatedList
              users={currentData}
              handleUserDetails={handleUserDetails}
              setUsers={setUsers}
            />
          )}
          <div className="pagination">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              startIcon={<ArrowBackIosRoundedIcon />}
            >
              Previous
            </Button>
            <div className="page"> {currentPage} </div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= totalItems}
              endIcon={<ArrowForwardIosRoundedIcon />}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {!searchList && <p className="noUsers">User not found!</p>}
    </div>
  );
};

export default Users;
