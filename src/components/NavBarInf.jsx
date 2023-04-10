import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBookmark, faUser,faRoute } from "@fortawesome/free-solid-svg-icons";

const NavBarInf = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="navbar-inf">
      <NavLink to="/">
        <FontAwesomeIcon icon={faHouse} className="navbar-home navbar-icon" />
      </NavLink>

      {!isLoggedIn && !user && (
        <NavLink to="/routes/all">
          <FontAwesomeIcon icon={faRoute} className="navbar-home navbar-icon" />
        </NavLink>
      )}

      {isLoggedIn && user && (
        <NavLink to="/saved-routes/all">
          <FontAwesomeIcon
            icon={faBookmark}
            className="navbar-route navbar-icon"
          />
        </NavLink>
      )}

      {isLoggedIn && user && (
        <NavLink to="/users/me">
          <FontAwesomeIcon icon={faUser} className="navbar-user navbar-icon" />
        </NavLink>
      )}
      {isLoggedIn && user && (
        <NavLink to="/inventary">
          <img
            src="/images/backpack.png"
            alt="navbar-inventary"
            className="navbar-icon constrast"
          />
        </NavLink>
      )}
    </div>
  );
};

export default NavBarInf;
