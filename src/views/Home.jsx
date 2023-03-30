import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
   const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn && <p>{user.username}</p>}
    </div>
  )
}
