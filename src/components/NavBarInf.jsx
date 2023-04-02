import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavBarInf = () => {
  const { user, isLoggedIn, logOutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <NavLink to="/routes/all">Routes</NavLink>
        <li>
          <NavLink to="/users/me">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/inventary">Inventary</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBarInf;
