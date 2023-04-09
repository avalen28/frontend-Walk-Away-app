import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routesService from "../services/routeService";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import RouteCard from "../components/RouteCard";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [allRoutes, setAllRoutes] = useState([]);
  const [key, setKey] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const getRoutes = async () => {
    try {
      const response = await routesService.getRoutes();
      setAllRoutes(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = () => {
    const keyNum = Number(key);
    const result = allRoutes.filter((elem) => {
      return (
        elem.name.toLowerCase().includes(key) ||
        elem.distance === keyNum ||
        elem.level === keyNum
      );
    });
    setSearchResults(result);
  };

  const handleKey = (e) => {
    setKey(e.target.value.toLowerCase());
  };

  useEffect(() => {
    getRoutes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (key !== "" && key !== " ") {
      handleFilter();
    } else {
      setSearchResults(null);
    }
  }, [key]);

  return (
    <div className="home">
      <div className="home-title block">
        <h1>Walk Away</h1>
        <p>Your great adventure starts now!</p>

          <div className="search-box">
            <label>Search by name, distance, km...</label>
            <div className="query">
              <input
                type="text"
                name="userSearch"
                value={key}
                placeholder="Search your next adventure"
                onChange={handleKey}
              />
            </div>
          </div>

      </div>
      <div className="body">

          <div className="search-results">
            {searchResults &&
              searchResults.map((route) => (
                <RouteCard route={route} key={route._id} />
              ))}
          </div>

      </div>
    </div>
  );
}
