import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faUserPlus,faArrowRightToBracket,faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, isLoggedIn, logOutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar-sup">
      <div className="navbar-sup-auth">
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
