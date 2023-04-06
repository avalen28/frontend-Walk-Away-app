import React from "react";
import { NavLink} from "react-router-dom";

const NavBarInf = () => {


  return (
    <div className="navbar-inf">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/routes/all">Routes</NavLink>
      <NavLink to="/users/me">Profile</NavLink>
      <NavLink to="/inventary">Inventary</NavLink>
    </div>
  );
};

export default NavBarInf;
