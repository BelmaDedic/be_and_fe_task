import { UserObject } from './UserObject';
import UserCards from './UserCards';
import { Dispatch, SetStateAction } from 'react';

interface PaginatedListProps {
  users: UserObject[];
  handleUserDetails: (user: UserObject) => void;
  setUsers: Dispatch<SetStateAction<UserObject[]>>;
}

const PaginatedList = ({ users, handleUserDetails, setUsers }: PaginatedListProps) => {
  return (
    <div className='cards'>
        {users.map((user, index) => (
            <UserCards key={index} user = { user } handleUserDetails={handleUserDetails}  handleSetUsers={setUsers}/>
        )) }
    </div>
  );
};

export default PaginatedList;