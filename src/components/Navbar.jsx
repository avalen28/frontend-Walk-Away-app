import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, isLoggedIn, logOutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar-sup">
      <div className="navbar-sup-auth">
        {!isLoggedIn && <Link to="/signup">Sign up</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
      {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
      </div>
      <div className="navbar-sup-back">
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
}
