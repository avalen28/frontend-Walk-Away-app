import React, { useState, useEffect } from "react";
import inventaryService from "../../services/inventaryService";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faUtensils,
  faShirt,
  faSocks,
  faPen
} from "@fortawesome/free-solid-svg-icons";

const Inventary = () => {
  const { user } = useAuth();
  const [inventary, setInventary] = useState(null);
  const getInventary = async () => {
    try {
      const inventaryFromDB = await inventaryService.getInventary();
      setInventary(inventaryFromDB);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getInventary();
  }, []);
  return (
    <div className="inventary-container block">
      {user && inventary && (
        <div className="inventary-card block">
          <div className="inventary-logo-and-edit">
            <img
              src="/images/backpack.png"
              alt="backpack"
            />
            <Link to={"/inventary/edit"}>
              <FontAwesomeIcon
                icon={faPen}
                className="route-user-options-icon"
              />
            </Link>
          </div>
          <div className="inventary-items">
            <div className="inventary-icons">
              <FontAwesomeIcon
                icon={faBottleWater}
                className="route-user-options-icon"
              />
              <FontAwesomeIcon
                icon={faUtensils}
                className="route-user-options-icon"
              />
              <FontAwesomeIcon
                icon={faShirt}
                className="route-user-options-icon"
              />
              <FontAwesomeIcon
                icon={faSocks}
                className="route-user-options-icon"
              />
            </div>
            <div className="inventary-options">
              <p>{inventary.drinks}</p>
              <p>{inventary.food}</p>
              <p>{inventary.sportswear}</p>
              <p>{inventary.footwear}</p>
            </div>
          </div>

          <div className="personal-items">
            <p>Your personal Items</p>
            <ul>
              {inventary.other.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        
        </div>
      )}
    </div>
  );
};

export default Inventary;
