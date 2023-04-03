import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
import savedRoutesService from "../../services/savedRoutesService";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import RouteCard from "../../components/RouteCard";

const SingleRoute = () => {
  const { user } = useAuth(); //esto comprueba si hay usuario
  const params = useParams();
  const Navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [savedButton, setSavedButton] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(false);
  const getRoute = async () => {
    try {
      const route = await routesService.getRoute(params.routeId);

      setRoute(route);
      const responseSavedRoute = await savedRoutesService.getSingleRoute(
        params.routeId
      );

      if (!responseSavedRoute) {
        setSavedButton(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveRoute = async () => {
    try {
      const savedRouteFromDB = await savedRoutesService.postSavedRoute(
        route._id
      );
      if (savedRouteFromDB) {
        Navigate("/saved-routes/all");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      await routesService.deleteRoute(route._id);
      setDeleteRoute(false);
      Navigate("/routes/all");
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
          <p>{route.tips}</p>
          {savedButton && (
            <button onClick={handleSaveRoute}>Save this route</button>
          )}
          {user && user.isAdmin && (
            <Link to={`/routes/edit/${route._id}`}>Edit this route</Link>
          )}
          {user && user.isAdmin && (
            <button onClick={() => setDeleteRoute(true)}>
              Delete this route
            </button>
          )}
          {deleteRoute && (
            <div>
              <h4>Do you want to delete this route?</h4>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setDeleteRoute(false)}>No</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleRoute;
