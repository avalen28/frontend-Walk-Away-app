import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
import savedRoutesService from "../../services/savedRoutesService";
import inventaryService from "../../services/inventaryService";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import RouteCard from "../../components/RouteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faX,
  faHeart,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const SingleRoute = () => {
  const { user } = useAuth();
  const params = useParams();
  const Navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [savedRoute, setSavedRoute] = useState(null);
  const [userInventary, setUserInventary] = useState(null);
  const [savedButton, setSavedButton] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(false);
  
  const getRoute = async () => {
    try {
      const route = await routesService.getRoute(params.routeId);
      setRoute(route);
    } catch (error) {
      console.error(error);
    }
  };

  const getSavedRoute = async () => {
    try {
       const responseSavedRoute = await savedRoutesService.getSingleRoute(
         params.routeId
       );
       if (!responseSavedRoute) {
         setSavedButton(true);
       } else {
         setSavedRoute(responseSavedRoute);
       }
    } catch (error) {
      console.error(error)
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
        setSavedRoute(savedRouteFromDB);
        setSavedButton(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSavedRoute = async () => {
    try {
      await savedRoutesService.deleteSavedRoute(savedRoute._id);
      setSavedButton(true)
    } catch (error) {
      console.error(error)
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
    getSavedRoute();
    getInventary();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="route-container">
      {route && userInventary && (
        <div className="single-route-card" key={route._id}>
          <RouteCard route={route} />

          <div className="route-user-options">
            {savedButton ? (
              <button onClick={handleSaveRoute}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="route-user-options-icon"
                />
              </button>
            ) : (
              <button onClick={handleDeleteSavedRoute}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="route-user-options-icon saved"
                />
              </button>
            )}
            {user && user.isAdmin && (
              <Link to={`/routes/edit/${route._id}`}>
                <FontAwesomeIcon
                  icon={faPen}
                  className="route-user-options-icon"
                />
              </Link>
            )}
            {user && user.isAdmin && (
              <button onClick={() => setDeleteRoute(true)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="route-user-options-icon"
                />
              </button>
            )}
            {deleteRoute && (
              <div className="sure-to-delete">
                <h4>Do you want to delete this route?</h4>
                <div>
                  <button className="delete" onClick={handleDelete}>
                    Yes
                  </button>
                  <button onClick={() => setDeleteRoute(false)}>No</button>
                </div>
              </div>
            )}
          </div>
          <div className="route-inventary">
            <p className="title">You will need</p>
            <ul className="inventary-route">
              <li
                style={{
                  color:
                    route.inventary.drinks === userInventary.drinks
                      ? "black"
                      : "lightgray",
                }}
              >
                {route.inventary.drinks} of water{" "}
                {route.inventary.drinks === userInventary.drinks ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faX} />
                )}
              </li>
              <li
                style={{
                  color:
                    route.inventary.food === userInventary.food
                      ? "black"
                      : "lightgray",
                }}
              >
                {route.inventary.food}{" "}
                {route.inventary.food === userInventary.food ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faX} />
                )}
              </li>
              <li
                style={{
                  color:
                    route.inventary.sportswear === userInventary.sportswear
                      ? "black"
                      : "lightgray",
                }}
              >
                {route.inventary.sportswear}{" "}
                {route.inventary.sportswear === userInventary.sportswear ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faX} />
                )}
              </li>
              <li
                style={{
                  color:
                    route.inventary.footwear === userInventary.footwear
                      ? "black"
                      : "lightgray",
                }}
              >
                {route.inventary.footwear}{" "}
                {route.inventary.footwear === userInventary.footwear ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faX} />
                )}
              </li>
            </ul>
            <div className="route-info-single-route">
              <h3 className="title">Description</h3>
              <h3>{route.description}</h3>
            </div>
            <div className="route-info-single-route">
              <h3 className="title">Tips</h3>
              <h3>{route.tips}</h3>
            </div>

            {userInventary.other.length > 0 ? (
              <div className="personal-items">
                <p className="personal-items-title">Your personal items</p>
                <ul className="user-items">
                  {userInventary.other.map((elem) => (
                    <li key={elem}>{elem}</li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRoute;
