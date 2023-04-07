import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="home">
      <div className="home-title block">
        <h1>Walk Away</h1>
        <p>Your great adventure starts now!</p>
      </div>
      <div className="home-intro">
        {isLoggedIn && <h3>Hello {user.username}</h3>}

        {!isLoggedIn ? (
          <>
            <div className="auth-links block">
              <NavLink to={"/login"}>Log in</NavLink>
              <NavLink to={"/signup"}>Sign up</NavLink>
            </div>
          </>
        ) : (
          <div>
              {/* <input type="text" placeholder="Search your next adventure" />
              <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
