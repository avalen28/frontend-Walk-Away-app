import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routesService from "../../services/routeService";
import { useNavigate } from "react-router-dom";
import RouteCard from "../../components/RouteCard";

const AllRoutes = () => {
  const [routes, setRoutes] = useState(null);
  const Navigate = useNavigate();
  const getRoutes = async () => {
    try {
      const response = await routesService.getRoutes();
      setRoutes(response);
    } catch (error) {
      console.error(error);
      Navigate("/routes");
    }
  };
  useEffect(() => {
    getRoutes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
          {routes && routes.map(route => <RouteCard route={route} key={route._id } /> )}
     
    </div>
  );
};

export default AllRoutes;
