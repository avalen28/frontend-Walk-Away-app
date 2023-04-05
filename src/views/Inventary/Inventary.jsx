import React, { useState, useEffect } from "react";
import inventaryService from "../../services/inventaryService";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

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
    <div>
      {user && <h3>Hello {user.username}, this is your inventary</h3>}
      <h4>Currently you have:</h4>
      {inventary && inventary.drinks && <p>{inventary.drinks}</p>}
      {inventary && inventary.food && <p>{inventary.food}</p>}
      {inventary && inventary.sportswear && <p>{inventary.sportswear}</p>}
      {inventary && inventary.footwear && <p>{inventary.footwear}</p>}
      {inventary && inventary.other && (
        <div>
          <p>Your personal Items</p>
          <ul>
            {inventary.other.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to={"/inventary/edit"}>Update your Inventary</Link>
    </div>
  );
};

export default Inventary;
