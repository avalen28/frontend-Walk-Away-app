import React from 'react';
import { Link } from 'react-router-dom';

const RouteCard = ({route}) => {
    return (
      <div className="route-card" >
        <h3>{route.name}</h3>
        <Link to={`/routes/${route._id}`}>
          <img src={route.image} alt="route view" style={{ width: "100px" }} />
        </Link>
        <p>{`Level:${route.level}`}</p>
      </div>
    );

};

export default RouteCard;