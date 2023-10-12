import { UserObject } from './UserObject';
import UserCards from './UserCards';

interface PaginatedListProps {
  users: UserObject[];
  handleUserDetails: (user: UserObject) => void
}

const PaginatedList = ({ users, handleUserDetails }: PaginatedListProps) => {
  return (
    <div className='cards'>
        {users.map((user, index) => (
            <UserCards key={index} user = { user } handleUserDetails={handleUserDetails}/>
        )) }
    </div>
  );
};

export default PaginatedList;