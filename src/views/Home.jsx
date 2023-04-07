import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="home">
      <h1 className="home-title">Walk Away</h1>
      <div className="home-intro">
        {isLoggedIn && <h3>Hello {user.username}</h3>}

        {!isLoggedIn ? (
          <>
            <p>Your adventure starts now!</p>
            <div className="auth-links">
              <NavLink to={"/login"}>Log in</NavLink>
              <NavLink to={"/signup"}>Sign up</NavLink>
            </div>
          </>
        ) : (
          <div>
            <input type="text" placeholder="Search your next adventure" />
          </div>
        )}
      </div>
    </div>
  );
}
