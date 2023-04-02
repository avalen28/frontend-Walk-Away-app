import React, { useState, useEffect } from "react";
import inventaryService from "../../services/inventaryService";
import { useNavigate } from "react-router-dom";
import { formatBody } from "../../utils";

const EditInventary = () => {
  const Navigate = useNavigate();
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
    // eslint-disable-next-line
  }, []);

  const handleAddToDB = () => {
    const inventaryToDB = formatBody(inventary);
    console.log("formated",inventaryToDB);
  };
    const handleSubmit = (e) => {
      console.log("handlesub",inventary)
    e.preventDefault();
    handleAddToDB();
  };
  return (
    <div>
      {inventary && (
        <form onSubmit={handleSubmit}>
          <label>Drinks</label>
          <input
            type="checkbox"
            name="drinks"
            checked={inventary.drinks}
            onChange={() =>
              setInventary((prev) => {
                return {
                  ...prev,
                  drinks: !inventary.drinks,
                };
              })
            }
          />
          <label>Food</label>
          <input
            type="checkbox"
            name="food"
            checked={inventary.food}
            onChange={() =>
              setInventary((prev) => {
                return {
                  ...prev,
                  food: !inventary.food,
                };
              })
            }
          />
          <label>Footwear</label>
          <input
            type="checkbox"
            name="footwear"
            checked={inventary.footwear}
            onChange={() =>
              setInventary((prev) => {
                return {
                  ...prev,
                  footwear: !inventary.footwear,
                };
              })
            }
          />
          <label>Sportswear</label>
          <input
            type="checkbox"
            name="sportswear"
            checked={inventary.sportswear}
            onChange={() =>
              setInventary((prev) => {
                return {
                  ...prev,
                  sportswear: !inventary.sportswear,
                };
              })
            }
          />
          <label>Other</label>
          <input
            type="text"
            name="other"
            value={inventary.other}
            placeholder="enter your inventary items separated by commas"
            onChange={(e) =>
              setInventary((prev) => {
                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                };
              })
            }
          />
          <button type="submit">Update your inventary</button>
        </form>
      )}
    </div>
  );
};

export default EditInventary;
