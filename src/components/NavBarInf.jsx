import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavBarInf = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="navbar-inf">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/routes/all">Routes</NavLink>
      {isLoggedIn && user && <NavLink to="/users/me">Profile</NavLink>}
      {isLoggedIn && user && <NavLink to="/inventary">Inventary</NavLink>}
    </div>
  );
};

export default NavBarInf;
