import { useState, useEffect } from "react";
import { UserObject } from "./UserObject";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import FindByEmail from "./FindByEmail";
import FindByPhoneNumber from "./FindByPhoneNumber";
import PaginatedList from "./PaginatedList";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const url = "http://localhost:5000";

interface UserProps{
    handleUserDetails: (user: UserObject) => void
}

const Users = ({handleUserDetails} : UserProps) => {

    const[users, setUsers] = useState<UserObject[]>([]);
    const[email, setEmail] = useState('default');
    const[phoneNumber, setPhoneNumber] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;
    const totalItems = users.length;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = users.slice(indexOfFirstItem, indexOfLastItem);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 1000)
        return () => clearTimeout(delayDebounceFn);
    }, [email]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 1000)
        return () => clearTimeout(delayDebounceFn);
    }, [phoneNumber]);

    const fetchUsers = async () => {
        const fetchedUsers = await fetch(url + "/users");
        const users: UserObject[] = await fetchedUsers.json();
        setUsers(users);
    }

    const fetchedUsers = async () => {
        if (email === "default" && phoneNumber === "default") {
          const data = await fetch("http://localhost:5000/users");
          const users: UserObject[] = await data.json();
          setUsers(users);
        }
    };

    const handleSearch = async () =>  {
        if(email !== 'default' || phoneNumber !== 'default'){
            console.log(email);
            const data = await fetch("http://localhost:5000/users?email=" + email + "&phoneNumber=" + phoneNumber);
            const users: UserObject[] = await data.json();
            console.log(users);
            setUsers(users);
        } else if (email === 'default' || phoneNumber === 'default'){
            fetchUsers();
        }
    }

    const addUser = () => {
        navigate('/AddUser');
    }

    return ( 
        <div className="users">
            <div className="home">
                <div className="leftComponentAddUser">
                <Button variant="outlined" onClick={addUser}>Add user</Button>
                </div>
                <div className="right-componentsSearch">
                    <div className="searchByEmail">
                        <FindByEmail passSetEmail={setEmail} />
                    </div>
                    <div className="searchByPhoneNumber">
                        <FindByPhoneNumber passSetPhoneNumber={setPhoneNumber}/>
                    </div>
                </div>
            </div>
            <div className="title">
                <p> Users </p>
            </div>

            <div className="homePagination">
                { users && <PaginatedList users = {currentData} handleUserDetails = {handleUserDetails} setUsers={setUsers}/>}    
                <div className="pagination">
                    <Button variant="outlined" color="secondary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} startIcon={ <ArrowBackIosRoundedIcon/> }>Previous</Button>
                    <div className="page"> {currentPage} </div>               
                    <Button variant="outlined" color="secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= totalItems} endIcon={ <ArrowForwardIosRoundedIcon/> }>Next</Button>
                </div>

            </div>
        </div>
    );
}
 
export default Users;