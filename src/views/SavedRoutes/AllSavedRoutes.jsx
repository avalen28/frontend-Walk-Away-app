import React, { useState, useEffect } from "react";
import savedRoutesService from "../../services/savedRoutesService";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  faChartSimple,
  faShoePrints,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllSavedRoutes = () => {
  const { user, storeToken, authenticateUser, removeToken } = useAuth();
  const [savedRoutes, setSavedRoutes] = useState(null);

  const getSavedRoutes = async () => {
    try {
      const savedRoutesFromDB = await savedRoutesService.getAllSavedRoutes();
      setSavedRoutes(savedRoutesFromDB);
    } catch (error) {
      console.error(error);
    }
  };
  const handleStatus = async (id, status) => {
    try {
      const response = await savedRoutesService.editSavedRoute(id, { status });
      if (status === "finished" && response) {
        removeToken();
        storeToken(response.authToken);
        authenticateUser();
      }
      getSavedRoutes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSavedRoutes();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="saved-routes-container">
      <h4>Saved routes</h4>
      {savedRoutes &&
        savedRoutes.map((savedRoute) => {
          return (
            <div key={savedRoute._id} className="route-card-saved">
              <Link to={`/routes/${savedRoute.routeId._id}`}>
                <img src={savedRoute.routeId.image} alt="route default visual" />
              </Link>
              <div className="route-saved-info">
                <h4>{savedRoute.routeId.name}</h4>
                <div className="route-saved-stats">
                  <p>
                    <FontAwesomeIcon icon={faChartSimple} />{" "}
                    {savedRoute.routeId.level}
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faShoePrints}
                      style={{ rotation: "270" }}
                    />{" "}
                    {savedRoute.routeId.distance}km
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faStopwatch} />{" "}
                    {savedRoute.routeId.estimatedDuration}hrs.
                  </p>
                </div>
              </div>
              <div className="route-saved-state">
                {user && user.level < savedRoute.routeId.level ? (
                  <h3 className="route-card-saved-status-negative">
                    {`Sorry but your current level (level ${user.level}) is below the route level.`}
                  </h3>
                ) : (
                  <div className="route-card-saved-new-status">
                    <p>Status: {savedRoute.status} </p>
                    {savedRoute.status === "pending" ? (
                      <button
                        onClick={() => handleStatus(savedRoute._id, "started")}
                      >
                        Start
                      </button>
                    ) : savedRoute.status === "started" ? (
                      <div>
                        <button
                          onClick={() =>
                            handleStatus(savedRoute._id, "finished")
                          }
                        >
                          Finish
                        </button>
                        <button
                          onClick={() =>
                            handleStatus(savedRoute._id, "pending")
                          }
                        className="cancel-route-button">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStatus(savedRoute._id, "pending")}
                      >
                        Repeat route
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      {savedRoutes && savedRoutes.length < 1 && (
        <div className="no-saved-routes">
          <p className="title">No routes saved... </p>
          <Link to={"/routes/all"}>See all routes</Link>
        </div>
      )}
    </div>
  );
};

export default AllSavedRoutes;
