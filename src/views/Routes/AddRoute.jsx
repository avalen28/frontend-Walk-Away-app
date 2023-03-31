import React from "react";
import { useState } from "react";
import routesService from "../../services/routeService";
import { useNavigate } from "react-router-dom";
import formatRouteBody from "../../utils";
import toast from "react-hot-toast";

const AddRoute = () => {
  const defaultRoute = {
    name: "",
    image: "",
    distance: 0,
    level: 1,
    description: "",
    estimatedDuration: 0,
    inventary: "",
    tips: "",
  };
  const Navigate = useNavigate();
  const [newRoute, setNewRoute] = useState(defaultRoute);
  const handleChange = (e) => {
    setNewRoute((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddRoute = async () => {
    const routeCorrectFormatToDB = formatRouteBody(newRoute);
    try {
      const createdRoute = await routesService.createNewRoute(
        routeCorrectFormatToDB
      );
      Navigate(`/routes/${createdRoute._id}`);
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    handleAddRoute();
    setNewRoute(defaultRoute);
  };

  return (
    <div>
      <h2>Add a new route</h2>
      <form onSubmit={handleCreate}>
        <label>Route name</label>
        <input
          type="text"
          name="name"
          value={newRoute.name}
          onChange={handleChange}
          required
        />
        <label>Route img</label>
        <input
          type="text"
          name="image"
          value={newRoute.image}
          onChange={handleChange}
          required
        />
        <label>Distance (km)</label>
        <input
          type="number"
          min="0"
          name="distance"
          value={newRoute.distance}
          onChange={handleChange}
          required
        />
        <label>Level</label>
        <input
          type="number"
          min={0}
          max={5}
          name="level"
          value={newRoute.level}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          maxLength="500"
          name="description"
          value={newRoute.description}
          onChange={handleChange}
        />
        <label>Estimated duration</label>
        <input
          type="number"
          name="estimatedDuration"
          value={newRoute.estimatedDuration}
          onChange={handleChange}
          required
        />
        <label>Inventary</label>
        <input
          type="text"
          name="inventary"
          value={newRoute.inventary}
          placeholder="enter your inventary items separated by commas"
          onChange={handleChange}
          required
        />
        <label>tips</label>
        <input
          type="text"
          name="tips"
          value={newRoute.tips}
          onChange={handleChange}
        />
        <button type="submit">Create Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
