import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";

const EditUser = () => {
  const { user } = useAuth();
    const [userToEdit, setUserToEdit] = useState(user);
    const [errorMessage, setErrorMessage] = useState(null);
  const [newPassword, setNewPassword] = useState({
    password1: "",
    password2: "",
  });

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
      <form>
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
          required
        />
        <label>Confirm your new password</label>
        <input
          type="password"
          name="password2"
          value={newPassword.password2}
          onChange={handleChangePassword}
          required
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button>Edit your profile</button>
      </form>
    </div>
  );
};

export default EditUser;
