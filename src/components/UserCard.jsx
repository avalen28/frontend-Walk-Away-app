import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faHeart,
  faTrash,
  faTrophy,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ user }) => {
  const [deleteRoute, setDeleteRoute] = useState(false);
  const Navigate = useNavigate();
  const { logOutUser } = useAuth();

  const handleDelete = async () => {
    try {
      await userService.deleteUser();
      setDeleteRoute(false);
      logOutUser();
      Navigate("/users/all");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="user-card">
      <div className="user-card-header">
        <img src={user.img} alt="user avatar" />
        <Link to={"/users/edit"}>
          <FontAwesomeIcon icon={faPen} className="profile-edit-icon" />
        </Link>
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
                className="user-evolution-info"
              />{" "}
              {user.experiencePoints} xp
            </p>
          </div>
          <div className="user-options">
            <button onClick={() => setDeleteRoute(true)}>
              <FontAwesomeIcon icon={faTrash} className="user-evolution-info" />
            </button>
          </div>
        </div>
      {deleteRoute && (
        <div className="sure-to-delete">
          <h4>Do you want to delete this user?</h4>
          <div>
            <button onClick={handleDelete} className="delete">
              Yes
            </button>
          </div>
          <div>
            <button onClick={() => setDeleteRoute(false)}>No</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserCard;
