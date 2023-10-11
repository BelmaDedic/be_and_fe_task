import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/users/Users';
import UserDetails from './components/users/UserDetails';
import { UserObject } from './components/users/UserObject';
import UpdateUser from './components/users/UpdateUser';

function App() {
  const [userDetails, setUserDetails] = useState<UserObject>();
  
  const handleUserDetails = (user: UserObject): void => {
    setUserDetails(user);
  }

  return (
      <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Users handleUserDetails={handleUserDetails}/> } />
                <Route path="/UserDetails" element={<UserDetails  userDetails={userDetails}/> } />
                <Route path='/updateUser/:id' element={< UpdateUser />} />
              </Routes>
            </div>
          </Router>
  
  );
}

export default App;
