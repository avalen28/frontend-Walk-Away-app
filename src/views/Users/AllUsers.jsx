import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
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
    {users && users.map(users => <UserCard user={users} key={users._id }/>)}
  </div>;
};

export default AllUsers;
