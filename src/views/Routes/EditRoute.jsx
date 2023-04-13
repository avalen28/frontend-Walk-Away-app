import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import routesService from "../../services/routeService";
import { formatRouteBody } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faUtensils,
  faShirt,
  faSocks,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

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
    const routeCorrectFormatToDB = formatRouteBody(route, "edit");
    if (routeCorrectFormatToDB) {
      try {
       const response = await routesService.editRoute(routeId, routeCorrectFormatToDB);
        if (response) {
          toast.success("route updated");
          Navigate(`/routes/${routeId}`);
        } else {
           toast.error(
             "something went wrong. Please check your fields and try again"
           );
        }
      } catch (error) {
        console.error(error);
        toast.error("ups...something went wrong. Please try again");
      }
    } else {
      toast.error("please check your form fields");
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
    <div className="new-route-card">
      <h2 className="new-route-title">Edit route</h2>
      {route && (
        <form onSubmit={handleUpdate} className="new-route-info">
          <div className="new-route-block">
            <label>Route name</label>
            <input
              type="text"
              name="name"
              value={route.name}
              onChange={handleChange}
            />
          </div>
          <div className="new-route-block">
            <label>Route picture</label>
            <input
              type="text"
              name="image"
              value={route.image}
              onChange={handleChange}
            />
          </div>
          <div className="new-route-block">
            <label>Route map</label>
            <input
              type="text"
              name="routeImage"
              value={route.routeImage}
              onChange={handleChange}
            />
          </div>
          <div className="new-route-block">
            <label>Distance (km)</label>
            <input
              type="number"
              min="0"
              name="distance"
              value={route.distance}
              onChange={handleChange}
            />
          </div>
          <div className="new-route-block">
            <label>Level</label>
            <input
              type="number"
              min={1}
              max={5}
              name="level"
              value={route.level}
              onChange={handleChange}
            />
          </div>
          <div className="new-route-block">
            <label>Description</label>
            <textarea
              type="text"
              maxLength="500"
              name="description"
              value={route.description}
              onChange={handleChange}
              className="textarea"
            />
          </div>
          <div className="new-route-block">
            <label>Estimated duration</label>
            <input
              type="number"
              name="estimatedDuration"
              value={route.estimatedDuration}
              onChange={handleChange}
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
                value={route.inventary.drinks}
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
                value={route.inventary.food}
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
            </div>
          </div>

          <div className="new-route-tips">
            <h3>tips</h3>
            <textarea
              type="text"
              name="tips"
              value={route.tips}
              onChange={handleChange}
              className="textarea"
            />
          </div>

          <button type="submit">Update route</button>
        </form>
      )}
    </div>
  );
};

export default EditRoute;
