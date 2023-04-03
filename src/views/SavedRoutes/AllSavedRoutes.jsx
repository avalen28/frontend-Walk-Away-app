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
  useEffect(() => {
    getSavedRoutes();
  }, []);
  return (
    <div>
      {savedRoutes &&
              savedRoutes.map((elem) => {
                  return (
                      <div>
                          <RouteCard route={elem.routeId} key={elem._id} />
                          <p>{elem.status}</p>
                          <button>XXXXX</button>
                      </div>

                  )
              })}
    </div>
  );
};

export default AllSavedRoutes;
