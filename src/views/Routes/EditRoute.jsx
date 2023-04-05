import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
// import formatRouteBody from "../../utils";
import { formatRouteBody } from "../../utils";

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

    const handleInventary = (e) => {
      setRoute((prev) => {
        return {
          ...prev,
          inventary: { ...prev.inventary, [e.target.name]: e.target.value },
        };
      });
    };
  return (
    <div>
      {route && (
        <form onSubmit={handleUpdate}>
          <h2>Edit route</h2>
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
          <h3>Inventary</h3>
          <label>Drinks</label>
          <select
            name="drinks"
            value={route.inventary.drinks}
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
            value={route.inventary.food}
            required
          >
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="All day meal">All day meal</option>
            <option value="Two days meal">Two days meal</option>
          </select>
          <label>Sportswear</label>
          <select
            name="sportswear"
            value={route.inventary.sportswear}
            onChange={handleInventary}
            required
          >
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
          <select
            name="footwear"
            value={route.inventary.footwear}
            onChange={handleInventary}
            required
          >
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
            value={route.tips}
            onChange={handleChange}
          />

          <button type="submit">Update route</button>
        </form>
      )}
    </div>
  );
};

export default EditRoute;
