import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="home">
      <h1 className="home-tittle">Walk Away</h1>
      <div className="home-intro">
        {isLoggedIn && <h3>Hello {user.username}</h3>}
        <article>
          A walk in nature walks the soul back home. The beautiful thing about
          hiking is that it's truly an activity everyone can do. Whether you're
          young or old, an expert or an amateur, there's a trail out there that
          will be perfect for you.
        </article>

        <p>Your adventure starts now!</p>
      </div>
    </div>
  );
}
