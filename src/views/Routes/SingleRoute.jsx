import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import routesService from "../../services/routeService";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import RouteCard from "../../components/RouteCard";

const SingleRoute = () => {
  const { user } = useAuth(); //esto comprueba si hay usuario
  const params = useParams();
  const [route, setRoute] = useState(null);
  const getRoute = async () => {
    try {
      const response = await routesService.getRoute(params.routeId);
      setRoute(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoute();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {route && (
        <div className="single-route-card" key={route._id}>
          <RouteCard route={route} />
          <p>{`${route.distance}km`}</p>
          <p>{`Estimated time:${route.level}h.`}</p>
          <p>{route.description}</p>
          <Link to={"/AUN POR DEFINIR"}>Save this route</Link>
          {user && user.isAdmin && (
            <Link to={`/routes/edit/${route._id}`}>Edit this route</Link>
          )}
          {user && user.isAdmin && (
            <Link to={`/routes/delete/${route._id}`}>Delete this route</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleRoute;
