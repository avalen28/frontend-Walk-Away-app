import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { useAuth } from "../hooks/useAuth";


const UserCard = ({ user }) => {
  const [deleteRoute, setDeleteRoute] = useState(false);
  const Navigate = useNavigate()
  const {logOutUser } = useAuth();

  const handleDelete = async () => {
    try {
      await userService.deleteUser();
      setDeleteRoute(false)
      logOutUser()
      Navigate("/users/all")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="user-card">
      <img src={user.img} alt="user avatar" style={{ width: "100px" }} />
      <h3>{user.username}</h3>
      <h4>{user.email}</h4>
      <p>{user.level}</p>
      <p>{user.experiencePoints}</p>
      <Link to ={"/savedRoutes/all"} >See your saved routes</Link>
      <Link to={"/users/edit"}>Edit your profile</Link>
      <button onClick={() => setDeleteRoute(true)}>Delete profile</button>
      {deleteRoute && (
        <div>
          <h4>Do you want to delete this user?</h4>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setDeleteRoute(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
