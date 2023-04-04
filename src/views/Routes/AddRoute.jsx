import React from "react";
import { useState } from "react";
import routesService from "../../services/routeService";
import { useNavigate } from "react-router-dom";
import { formatRouteBody } from "../../utils";
// import toast from "react-hot-toast";

const AddRoute = () => {
  const defaultRoute = {
    name: "",
    image: "",
    distance: 0,
    level: 1,
    description: "",
    estimatedDuration: 0,
    inventary: { drinks: "1L.", food: "", sportswear: "", footwear: "" },
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

  const handleInventary = (e) => {

    console.log(e.target.name)
    console.log(e.target.value);
     setNewRoute((prev) => {
       return {
         ...prev,
         inventary: { ...prev.inventary, [e.target.name]: e.target.value }
       };
     });
    console.log(newRoute)
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
        <h3>Inventary</h3>
        <label>Drinks</label>
        <select
          name="drinks"
          value={newRoute.inventary.drinks}
          onChange={handleInventary}
          required
        >
          <option value="1L.">1L.</option>
          <option value="1.5L.">1.5L.</option>
          <option value="2L.">2L.</option>
          <option value="Isotonic drink">Isotonic drink</option>
        </select>
        <label>Food</label>
        <select
          name="food"
          onChange={handleInventary}
          value={newRoute.inventary.food}
          required
        >
          <option value="Lunch">Lunch</option>
          <option value="Snacks">Snacks</option>
          <option value="All day meal">All day meal</option>
          <option value="Two days meal">Two days meal</option>
        </select>
        <label>Sportswear</label>
        <select name="sportswear" onChange={handleInventary} required>
          <option value="Trekking clothes (spring weather)">
            Trekking clothes (spring weather)
          </option>
          <option value="Moutain clothes(winter weather)">
            Moutain clothes(winter weather)
          </option>
          <option value="High Mountain clothes">High Mountain clothes</option>
          <option value="Long Route">Long Route</option>
        </select>
        <label>Footwear</label>
        <select name="footwear" onChange={handleInventary} required>
          <option value="Light boots or trekking slippers">
            Light boots or trekking slippers
          </option>
          <option value="Moutain boots">Moutain boots</option>
          <option value="High Mountain boots">High Mountain boots</option>
        </select>

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
