import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faTrophy,
  faChartSimple,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ user }) => {
  const [deleteUser, setDeleteUser] = useState(false);
  const Navigate = useNavigate();
  const { logOutUser, user: userInSesion } = useAuth();


  const handleDelete = async () => {
    try {
      await userService.deleteUser();
      setDeleteUser(false);
      logOutUser();
      Navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="user-card">
      <div className="user-card-header">
        <img src={user.img} alt="user avatar" />
        {userInSesion._id === user._id && (
          <Link to={"/users/edit"}>
            <FontAwesomeIcon icon={faPen} className="profile-edit-icon" />
          </Link>
        )}
      </div>
      <div className="user-profile-info-container">
        <div className="user-profile-info transparent-card-background">
          <h3>{user.username}</h3>
          <h4>{user.email}</h4>
          <div className="user-evolution">
            <p className="user-evolution-info">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="user-evolution-info"
              />{" "}
              level {user.level}
            </p>
            <p className="user-evolution-info">
              <FontAwesomeIcon
                icon={faTrophy}
                className="user-evolution-info gold"
              />{" "}
              {user.experiencePoints} xp
            </p>
          </div>
          <div className="user-options">
            {userInSesion._id === user._id && (
              <button onClick={() => setDeleteUser(true)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="user-evolution-info gray"
                />
              </button>
            )}

            {user && user.isAdmin && (
              <Link to={`/users/all`}>
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="route-user-options-icon gray"
                />
              </Link>
            )}
          </div>
        </div>
        {deleteUser && (
          <div className="sure-to-delete">
            <h4>Do you want to delete this user?</h4>
            <div>
              <button onClick={handleDelete} className="delete">
                Yes
              </button>

              <button onClick={() => setDeleteUser(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
