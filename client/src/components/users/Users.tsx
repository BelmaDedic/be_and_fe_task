import { useState, useEffect, Dispatch, SetStateAction } from "react";
import UserCards from "./UserCards";
import { UserObject } from "./UserObject";

const url = "http://localhost:5000"

interface UserProps{
    handleUserDetails: (user: UserObject) => void
}

const Users = ({handleUserDetails} : UserProps) => {

    const[users, setUsers] = useState<UserObject[]>([]);

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        const fetchedUsers = await fetch(url + "/users");
        const users: UserObject[] = await fetchedUsers.json();
        setUsers(users);
    }

    return ( 
        <div className="users">
            <div className="title">
                <p> Users </p>
            </div>

            <div className="cards">
                { users &&
                users. map((user) => (
                    <UserCards user = { user } handleUserDetails={handleUserDetails}/>
                )) }
                
            </div>
        </div>
    );
}
 
export default Users;