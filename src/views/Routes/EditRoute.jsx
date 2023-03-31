import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
import formatRouteBody from "../../utils";

const EditRoute = () => {
  const { routeId } = useParams();
  const [route, setRoute] = useState(null);
  const Navigate = useNavigate();

  const getRoute = async () => {
    try {
      const routeFromDB = await routesService.getRoute(routeId);
      setRoute(routeFromDB);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRoute();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setRoute((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddToDB = async () => {
    const routeCorrectFormatToDB = formatRouteBody(route);
    try {
      await routesService.editRoute(routeId, routeCorrectFormatToDB);
      Navigate(`/routes/${routeId}`);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    handleAddToDB();
  };
  return (
    <div>
      {route && (
        <form onSubmit={handleUpdate}>
          <h2>Add a new route</h2>
          <label>Route name</label>
          <input
            type="text"
            name="name"
            value={route.name}
            onChange={handleChange}
          />
          <label>Route img</label>
          <input
            type="text"
            name="image"
            value={route.image}
            onChange={handleChange}
          />
          <label>Distance (km)</label>
          <input
            type="number"
            min="0"
            name="distance"
            value={route.distance}
            onChange={handleChange}
          />
          <label>Level</label>
          <input
            type="number"
            min={0}
            max={5}
            name="level"
            value={route.level}
            onChange={handleChange}
          />
          <label>Description</label>
          <input
            type="text"
            maxLength="500"
            name="description"
            value={route.description}
            onChange={handleChange}
          />
          <label>Estimated duration</label>
          <input
            type="number"
            name="estimatedDuration"
            value={route.estimatedDuration}
            onChange={handleChange}
          />
          <label>Inventary</label>
          <input
            type="text"
            name="inventary"
            value={route.inventary}
            placeholder="enter your inventary items separated by commas"
            onChange={handleChange}
          />
          <label>tips</label>
          <input
            type="text"
            name="tips"
            value={route.tips}
            onChange={handleChange}
          />
          <button>Update route</button>
        </form>
      )}
    </div>
  );
};

export default EditRoute;
