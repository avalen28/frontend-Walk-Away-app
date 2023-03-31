import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, isLoggedIn, logOutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {user && <p>Hello {user.username}</p>}
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!isLoggedIn && (
          <div>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </div>
        )}

        <Link to="/routes/all">Routes</Link>

        {isLoggedIn && (
          <li>
            <NavLink to="/private">Private view</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={() => logOutUser()}>Log out</button>
          </li>
        )}
        <li>
          <button onClick={() => navigate(-1)}>Go back</button>
        </li>
      </ul>
    </div>
  );
}
