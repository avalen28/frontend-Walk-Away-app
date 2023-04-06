import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import userService from "../../services/userService";


const UserProfile = () => {
    const [user, setUser] = useState(null)
    const getUser = async() => {
       try {
           const userFromDB = await userService.getUser()
           setUser(userFromDB)
       } catch (error) {
        console.error(error)
       } 
    }
    useEffect(() => {
      getUser();
      // eslint-disable-next-line
    },[])
    return <div className="user-container">
        {user && <UserCard user={user} key={user._id}/>}
  </div>;
};

export default UserProfile;
