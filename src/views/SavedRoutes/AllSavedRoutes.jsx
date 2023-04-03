import React, { useState, useEffect } from "react";
import savedRoutesService from "../../services/savedRoutesService";
import routesService from "../../services/routeService";
import RouteCard from "../../components/RouteCard";

const AllSavedRoutes = () => {
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
        const patata = await savedRoutesService.editSavedRoute(id, { status });
        getSavedRoutes()
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
            <div>
              <RouteCard route={savedRoute.routeId} key={savedRoute._id} />
              <div>
                <p>
                  {" "}
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
                        onClick={() => handleStatus(savedRoute._id, "finished")}
                      >
                        Finish route
                      </button>
                      <button
                        onClick={() => handleStatus(savedRoute._id, "pending")}
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
            </div>
          );
        })}
    </div>
  );
};

export default AllSavedRoutes;
