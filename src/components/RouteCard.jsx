import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandFist,faStar } from "@fortawesome/free-solid-svg-icons";

const RouteCard = ({route}) => {
    return (
      <div className="route-card-component">
        <Link to={`/routes/${route._id}`} className="img-link">
          <img src={route.image} alt="route view" style={{ width: "100px" }} />
        </Link>
        <div className="route-poins">
          <p>
            <FontAwesomeIcon icon={faStar} /> {route.level}
          </p>
          <p>
            <FontAwesomeIcon icon={faHandFist} /> 100 xp
          </p>
        </div>
      </div>
    );

};

export default RouteCard;