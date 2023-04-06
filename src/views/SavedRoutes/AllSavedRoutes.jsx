import React, { useState, useEffect } from "react";
import savedRoutesService from "../../services/savedRoutesService";
import RouteCard from "../../components/RouteCard";
import { useAuth } from "../../hooks/useAuth";

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
      // if finished, coger de la response del editsavedroute el token, cargarte el previo, etc
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
  }, []);

  return (
    <div>
      {savedRoutes &&
        savedRoutes.map((savedRoute) => {
          return (
            <div key={savedRoute._id} className="route-card-saved-all">
              <RouteCard route={savedRoute.routeId} />
              {user && user.level < savedRoute.routeId.level ? (
                <p className="route-card-saved-status-negative">
                  {`Sorry but your current level (level ${user.level}) is below the route level`}
                </p>
              ) : (
                <div className="route-card-saved-new-status">
                  <p>
                    Status: {savedRoute.status}
                    {savedRoute.status === "pending" ? (
                      <button
                        onClick={() => handleStatus(savedRoute._id, "started")}
                      >
                        Start route
                      </button>
                    ) : savedRoute.status === "started" ? (
                      <div>
                        <button
                          onClick={() =>
                            handleStatus(savedRoute._id, "finished")
                          }
                        >
                          Finish route
                        </button>
                        <button
                          onClick={() =>
                            handleStatus(savedRoute._id, "pending")
                          }
                        >
                          Cancel route
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStatus(savedRoute._id, "pending")}
                      >
                        Repeat route
                      </button>
                    )}
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default AllSavedRoutes;