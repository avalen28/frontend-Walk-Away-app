import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    return (
      <div className="user-card">
        <img src={user.img} alt="user avatar"style={{width:"100px"}} />
        <h3>{user.username}</h3>
        <h4>{user.email}</h4>
        <p>{user.level}</p>
        <p>{user.experiencePoints}</p>
        <Link to={"/users/edit"} >Edit your profile</Link>
        <button >Delete profile</button>
      </div>
    );
};

export default UserCard;