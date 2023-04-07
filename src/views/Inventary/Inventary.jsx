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
      {user &&inventary && <h3>Hello {user.username}, this is your inventary</h3>}
      <h4>Currently you have:</h4>
     <p>{inventary.drinks}</p>
      <p>{inventary.food}</p>
    <p>{inventary.sportswear}</p>
   <p>{inventary.footwear}</p>
    
        <div>
          <p>Your personal Items</p>
          <ul>
            {inventary.other.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
     
      <Link to={"/inventary/edit"}>Update your Inventary</Link>
    </div>
  );
};

export default Inventary;
