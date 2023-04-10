import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import UserCard from "../../components/UserCard";


const AllUsers = () => {
  const [users, setUsers] = useState(null)
  
  const getUsers = async () => {
    try {
      const usersFromDB = await userService.getUsers();
      setUsers(usersFromDB);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  },[])
  return <div>
    {users && users.map(user => {
     return (
       <div className="user-container" key={user._id}>
         {user && <UserCard user={user} />}
       </div>
     );
    })}
  </div>;
};

export default AllUsers;
