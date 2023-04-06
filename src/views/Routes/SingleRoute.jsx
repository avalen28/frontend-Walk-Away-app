import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
import savedRoutesService from "../../services/savedRoutesService";
import inventaryService from "../../services/inventaryService";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import RouteCard from "../../components/RouteCard";

const SingleRoute = () => {
  const { user } = useAuth();
  const params = useParams();
  const Navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [userInventary, setUserInventary] = useState(null);
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
  const getInventary = async () => {
    try {
      const inventaryFromDB = await inventaryService.getInventary(user._id);
      setUserInventary(inventaryFromDB);
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
    getInventary();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {route && userInventary && (
        <div className="single-route-card" key={route._id}>
          <RouteCard route={route} />
          <p>{`${route.distance}km`}</p>
          <p>{`Estimated time:${route.level}h.`}</p>
          <p>{route.description}</p>
          <p>You will need:</p>
          <ul className="inventary-route">
            <li
              style={{
                color:
                  route.inventary.drinks === userInventary.drinks
                    ? "green"
                    : "red",
              }}
            >
              Drinks: {route.inventary.drinks}{" "}
              {route.inventary.drinks === userInventary.drinks
                ? "Present in your inventary"
                : "Not present in your inventary"}
            </li>
            <li
              style={{
                color:
                  route.inventary.food === userInventary.food ? "green" : "red",
              }}
            >
              Food: {route.inventary.food}{" "}
              {route.inventary.food === userInventary.food
                ? "Present in your inventary"
                : "Not present in your inventary"}
            </li>
            <li
              style={{
                color:
                  route.inventary.sportswear === userInventary.sportswear
                    ? "green"
                    : "red",
              }}
            >
              Sportswear: {route.inventary.sportswear}{" "}
              {route.inventary.sportswear === userInventary.sportswear
                ? "Present in your inventary"
                : "Not present in your inventary"}
            </li>
            <li
              style={{
                color:
                  route.inventary.footwear === userInventary.footwear
                    ? "green"
                    : "red",
              }}
            >
              Footwear: {route.inventary.footwear}{" "}
              {route.inventary.footwear === userInventary.footwear
                ? "Present in your inventary"
                : "Not present in your inventary"}
            </li>
          </ul>
          <p>{route.tips}</p>
          {userInventary.other.length > 0 ? (
            <div>
              <p>your personal items</p>
              <ul>
                {userInventary.other.map(elem => <li key={elem}>{elem}</li>)}
              </ul>
            </div>
            
          ):"Your Personal Items are empty"}
        
         
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
