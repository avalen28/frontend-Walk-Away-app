import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faChartSimple,
  faShoePrints,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

const RouteCard = ({ route }) => {
  return (
    <div className="route-card-component">
      <div className="route-pictures">
        <h4>{route.name}</h4>
        <img
          src={route.image}
          alt="default route view"
          className="route-picture-img"
        />
      </div>
      <div className="route-card-info">
        <img
          src={route.routeImage}
          alt="default map"
          className="route-map-img"
        />
        <div className="stats">
          <div>
            <p>
              <FontAwesomeIcon icon={faChartSimple} />
            </p>
            <p>
              <FontAwesomeIcon icon={faShoePrints} />
            </p>
            <p>
              <FontAwesomeIcon icon={faStopwatch} />
            </p>
            <p>
              <FontAwesomeIcon icon={faTrophy}/>
            </p>
          </div>

          <div>
            <p>{route.level}</p>
            <p>{route.distance}km</p>
            <p>{route.estimatedDuration}</p>
            <p> 100 xp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
