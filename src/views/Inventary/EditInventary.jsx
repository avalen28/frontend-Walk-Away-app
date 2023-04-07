import React, { useState, useEffect } from "react";
import inventaryService from "../../services/inventaryService";
import { useNavigate } from "react-router-dom";
import { formatBody } from "../../utils";
import toast from "react-hot-toast";

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

  const handleAddToDB = async () => {
    const inventaryToDB = formatBody(inventary);
    if (inventaryToDB) {
      try {
        await inventaryService.editInventary(inventaryToDB);
        toast.success("inventary updated!")
        Navigate("/inventary");
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("please check your form fields")
    }
  };
  const handleInventary = (e) => {
    setInventary((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToDB();
  };
  return (
    <div className="edit-inventary-container">
      {inventary && (
        <form onSubmit={handleSubmit}>
          <div className="edit-drinks">
            <label>{`Current Drinks in your inventary: ${inventary.drinks}`}</label>
            <select
              name="drinks"
              value={inventary.drinks}
              onChange={handleInventary}
              required
            >
              <option value="1L.">1L.</option>
              <option value="1.5L.">1.5L.</option>
              <option value="2L.">2L.</option>
              <option value="Isotonic drink">Isotonic drink</option>
            </select>
          </div>
          <div className="edit-food">
            <label>{`Current Food in your inventary: ${inventary.food}`}</label>
            <select
              name="food"
              onChange={handleInventary}
              value={inventary.food}
              required
            >
              <option value="Lunch">Lunch</option>
              <option value="Snacks">Snacks</option>
              <option value="All day meal">All day meal</option>
              <option value="Two days meal">Two days meal</option>
            </select>
          </div>

          <div className="edit-sportswear">
            <label>{`Current Sportswear in your inventary: ${inventary.sportswear}`}</label>
            <select
              name="sportswear"
              value={inventary.sportswear}
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
          <div className="edit-footwear">
            <label>{`Current Footwear in your inventary: ${inventary.footwear}`}</label>
            <select
              name="footwear"
              value={inventary.footwear}
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
          <div className="edit-other">
            <label>Add your personal items</label>
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
          </div>

          <button type="submit">Update your inventary</button>
        </form>
      )}
    </div>
  );
};

export default EditInventary;
