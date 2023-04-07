import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRoute,faUser,faSuitcase } from "@fortawesome/free-solid-svg-icons";
const NavBarInf = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="navbar-inf">
      <NavLink to="/">
        <FontAwesomeIcon icon={faHouse} className="navbar-home" />
      </NavLink>
      <NavLink to="/routes/all">
        <FontAwesomeIcon icon={faRoute} className="navbar-route" />
      </NavLink>
      {isLoggedIn && user && (
        <NavLink to="/users/me">
          <FontAwesomeIcon icon={faUser} className="navbar-user" />
        </NavLink>
      )}
      {isLoggedIn && user && (
        <NavLink to="/inventary">
          <FontAwesomeIcon icon={faSuitcase} className="navbar-inventary" />
        </NavLink>
      )}
    </div>
  );
};

export default NavBarInf;
