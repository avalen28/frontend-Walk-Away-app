import React from "react";
import { useState } from "react";
import routesService from "../../services/routeService";
import { useNavigate } from "react-router-dom";
import { formatRouteBody } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faUtensils,
  faShirt,
  faSocks,
} from "@fortawesome/free-solid-svg-icons";
// import toast from "react-hot-toast";

const AddRoute = () => {
  const defaultRoute = {
    name: "",
    image: undefined,
    routeImage: undefined,
    distance: 0,
    level: 1,
    description: "",
    estimatedDuration: 1,
    inventary: {
      drinks: "1L.",
      food: "Lunch",
      sportswear: "Trekking clothes (spring weather)",
      footwear: "Light boots or trekking slippers",
    },
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
    const routeCorrectFormatToDB = formatRouteBody(newRoute, "create");
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
    setNewRoute((prev) => {
      return {
        ...prev,
        inventary: { ...prev.inventary, [e.target.name]: e.target.value },
      };
    });
  };

  return (
    <div className="new-route-card">
      <h2 className="new-route-title">New route</h2>
      <form onSubmit={handleCreate} className="new-route-info">
        <div className="new-route-block">
          <label>Route name</label>
          <input
            type="text"
            name="name"
            value={newRoute.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="new-route-block">
          <label>Route picture</label>
          <input
            type="text"
            name="image"
            value={newRoute.image}
            onChange={handleChange}
          />
        </div>
        <div className="new-route-block">
          <label>Route map</label>
          <input
            type="text"
            name="routeImage"
            value={newRoute.routeImage}
            onChange={handleChange}
          />
        </div>
        <div className="new-route-block">
          <label>Distance (km)</label>
          <input
            type="number"
            min="0"
            name="distance"
            value={newRoute.distance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="new-route-block">
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
        </div>
        <div className="new-route-block">
          <label>Description</label>
          <input
            type="text"
            maxLength="500"
            name="description"
            value={newRoute.description}
            onChange={handleChange}
            className="new-route-description"
          />
        </div>
        <div className="new-route-block">
          <label>Estimated duration</label>
          <input
            type="number"
            min={1}
            name="estimatedDuration"
            value={newRoute.estimatedDuration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="new-route-inventary">
          <h3>Inventary</h3>
          <div className="new-route-inventary-block">
            <p>
              <FontAwesomeIcon
                icon={faBottleWater}
                className="route-user-options-icon"
              />
            </p>
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
          </div>

          <div className="new-route-inventary-block">
            <p>
              <FontAwesomeIcon
                icon={faUtensils}
                className="route-user-options-icon"
              />
            </p>
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
          </div>

          <div className="new-route-inventary-block">
            <p>
              <FontAwesomeIcon
                icon={faShirt}
                className="route-user-options-icon"
              />
            </p>
            <select
              name="sportswear"
              value={newRoute.inventary.sportswear}
              onChange={handleInventary}
              required
            >
              <option value="Trekking clothes (spring weather)">
                Trekking clothes (spring weather)
              </option>
              <option value="Moutain clothes(winter weather)">
                Moutain clothes(winter weather)
              </option>
              <option value="High Mountain clothes">
                High Mountain clothes
              </option>
              <option value="Long Route">Long Route</option>
            </select>
          </div>

          <div className="new-route-inventary-block">
            <p>
              <FontAwesomeIcon
                icon={faSocks}
                className="route-user-options-icon"
              />
            </p>
            <select
              name="footwear"
              value={newRoute.inventary.footwear}
              onChange={handleInventary}
              required
            >
              <option value="Light boots or trekking slippers">
                Light boots or trekking slippers
              </option>
              <option value="Moutain boots">Moutain boots</option>
              <option value="High Mountain boots">High Mountain boots</option>
            </select>
          </div>
        </div>

        <div className="new-route-tips">
          <label>tips</label>
          <input
            type="text"
            name="tips"
            value={newRoute.tips}
            onChange={handleChange}
          />
          <button type="submit">Create Route</button>
        </div>
      </form>
    </div>
  );
};

export default AddRoute;
