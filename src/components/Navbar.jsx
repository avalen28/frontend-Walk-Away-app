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
        {!isLoggedIn && (
          <Link to="/signup">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Link>
        )}
        {isLoggedIn && (
          <button onClick={() => logOutUser()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        )}
      </div>
      <div className="navbar-sup-back">
        <button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
}
