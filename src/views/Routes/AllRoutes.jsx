import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routesService from "../../services/routeService";
import { useNavigate } from "react-router-dom";

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
      all routes view
      {routes &&
        routes.map((elem) => {
          return (
            <div className="Route-card" key={elem._id}>
              <h3>{elem.name}</h3>
              <Link to={`/routes/${elem._id}`}>
                <img
                  src={elem.image}
                  alt="route view"
                  style={{ width: "100px" }}
                />
              </Link>
              <p>{`Level:${elem.level}`}</p>
            </div>
          );
        })}
    </div>
  );
};

export default AllRoutes;
