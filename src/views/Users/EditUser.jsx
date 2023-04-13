import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditUser = () => {
  const { user, storeToken, authenticateUser, removeToken } = useAuth();
  const [userToEdit, setUserToEdit] = useState(user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newPassword, setNewPassword] = useState({
    password1: "",
    password2: "",
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setUserToEdit((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangePassword = (e) => {
    setNewPassword((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSendToDB = async () => {
    const body = { ...userToEdit, ...newPassword };
    try {
      const userFromDB = await userService.editUser(body);
      if (userFromDB) {
        removeToken();
        storeToken(userFromDB.authToken);
        authenticateUser();
        toast.success("Profile updated!")
        Navigate("/users/me");
      } else {
        toast.error("Please check your fields")
      }
    } catch (error) {
      console.error(error);
       toast.error("ups...something went wrong. Please try again");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendToDB();
  };

  const handleExit = () => {
     toast.success("No changes applied");
     Navigate("/users/me");
  }

  useEffect(() => {
    if (newPassword.password1 !== newPassword.password2) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage(undefined);
    }
    // eslint-disable-next-line
  }, [newPassword]);

  return (
    <div className="user-edit-container">
      <h2>Edit your profile</h2>
      <form onSubmit={handleSubmit} className="user-edit-form">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userToEdit.username}
          onChange={handleChange}
          required
        />
        <label>Image profile</label>
        <input
          type="text"
          name="img"
          value={userToEdit.img}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userToEdit.email}
          onChange={handleChange}
          required
        />
        <label>New password</label>
        <input
          type="password"
          name="password1"
          value={newPassword.password1}
          onChange={handleChangePassword}
        />
        <label>Confirm your new password</label>
        <input
          type="password"
          name="password2"
          value={newPassword.password2}
          onChange={handleChangePassword}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="user-edit-options">
          <button type="submit" className="button-edit">
            Edit it!
          </button>
          <button onClick={() => handleExit()} className="button-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
