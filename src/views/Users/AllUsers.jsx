import React, { useState, useEffect } from "react";
import userService from "../../services/userService";


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
    {users && users.map(users => {
      return (
        <div className="user-info" key={users._id}>
          <img src={users.img} alt="user avatar" style={{ width: "100px" }} />
          <p>{users.username}</p>
        </div>
      )
    })}
  </div>;
};

export default AllUsers;
