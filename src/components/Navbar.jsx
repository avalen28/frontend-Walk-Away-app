import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus,faArrowLeft, faArrowRightFromBracket,faRightToBracket} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, isLoggedIn, logOutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar-sup">
      <div className="navbar-sup-auth">
        {!isLoggedIn && (
          <div className="signup-login">
            <Link to={"/login"}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="navbar-icon"
              />
            </Link>
            <Link to={"/signup"}>
              <FontAwesomeIcon icon={faUserPlus} className="navbar-icon" />
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <button onClick={() => logOutUser()}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="navbar-icon"
            />
          </button>
        )}
      </div>
      <div className="navbar-sup-back">
        <button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="navbar-icon" />
        </button>
      </div>
    </div>
  );
}
