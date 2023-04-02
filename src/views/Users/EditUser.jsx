import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
        Navigate("/users/me");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendToDB();
  };

  useEffect(() => {
    if (newPassword.password1 !== newPassword.password2) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage(undefined);
    }
  }, [newPassword]);

  return (
    <div>
      <h2>Edit your profile</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Edit your profile</button>
      </form>
    </div>
  );
};

export default EditUser;
