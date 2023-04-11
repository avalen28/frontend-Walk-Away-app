import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import routesService from "../../services/routeService";
import { useNavigate } from "react-router-dom";
import RouteCard from "../../components/RouteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus
} from "@fortawesome/free-solid-svg-icons";

const AllRoutes = () => {
  const { user } = useAuth();
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
    <div className="all-routes-container">
      {user && user.isAdmin && (
        <Link to={"/routes/add"} className="add-route">
          <FontAwesomeIcon icon={faPlus} className="route-user-options-icon " />
        </Link>
      )}
      {routes &&
        routes.map((route) => <RouteCard route={route} key={route._id} />)}
    </div>
  );
};

export default AllRoutes;
