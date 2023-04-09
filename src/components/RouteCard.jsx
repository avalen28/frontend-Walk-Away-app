import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faChartSimple,
  faShoePrints,
  faStopwatch
} from "@fortawesome/free-solid-svg-icons";

const RouteCard = ({route}) => {
    return (
      <div className="route-card-component">
        <div className="route-pictures">
          <h4>{route.name}</h4>
          <img
            src={route.image}
            alt="default route view"
            className="route-picture-img"
          />
          <img
            src={route.routeImage}
            alt="default map"
            className="route-map-img"
          />
        </div>
        <div className="route-card-info">
        
            <p>
              <FontAwesomeIcon icon={faChartSimple} /> {route.level}
            </p>
            <p>
              <FontAwesomeIcon icon={faShoePrints} /> {route.distance}km
            </p>
            <p>
              <FontAwesomeIcon icon={faStopwatch} /> {route.estimatedDuration}
              hrs.
            </p>
            <p>
              <FontAwesomeIcon icon={faTrophy} /> 100 xp
            </p>

        </div>
      </div>
    );

};

export default RouteCard;