import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const SingleRoute = () => {
  const { user, isLoggedIn, isLoading } = useAuth(); //esto comprueba si hay usuario
  const params = useParams();
  const Navigate = useNavigate();
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
        <div className="Route-card" key={route._id}>
          <h3>{route.name}</h3>
          <Link to={`/routes/${route._id}`}>
            <img
              src={route.image}
              alt="route view"
              style={{ width: "100px" }}
            />
          </Link>
          <p>{`${route.distance}km`}</p>
          <p>{`Level:${route.level}`}</p>
          <p>{`Estimated time:${route.level}h.`}</p>
          <p>{route.description}</p>
          <Link to={"/AUN POR DEFINIR"}>Save this route</Link>
          {user && user.isAdmin && <Link to={`/routes/edit/${route._id}`}>Edit this route</Link>}
        </div>
      )}
      {/* Añadir edit y delete de Admin con user.isAdmin */}
    </div>
  );
};

export default SingleRoute;
