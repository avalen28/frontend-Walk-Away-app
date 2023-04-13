import React, { useContext, useState, useEffect } from "react";
import routesService from "../services/routeService";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faShoePrints,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import quotes from "../data/quotes.json";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [allRoutes, setAllRoutes] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");
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
  const getRandomQuote = () => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
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
    getRandomQuote();
    // eslint-disable-next-line
  }, [searchResults]);

  useEffect(() => {
    if (key !== "" && key !== " ") {
      handleFilter();
    } else {
      setSearchResults(null);
    }
    // eslint-disable-next-line
  }, [key]);

  return (
    <div className="home">
      <div className="home-title block">
        <h1>Walk Away</h1>
        <p>Your great adventure starts now!</p>

        <div className="search-box">
          <label>Search your next adventure</label>
          <div className="query">
            <input
              type="text"
              name="userSearch"
              value={key}
              placeholder="Name, distance or km"
              onChange={handleKey}
            />
            {user && isLoggedIn && (
              <Link to={"/routes/all"} className="button-see-all">
                {" "}
                See all routes
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="body">
        {!searchResults && (
          <div className="random-box">
            <h3 className="title">Funny quote</h3>
            <p>{randomQuote}</p>
          </div>
        )}
        {searchResults && (
          <div className="search-results">
            <h3>Results</h3>
            <div className="options">
              {searchResults.length === 0 && <p>No results found</p>}
              {searchResults.length > 0 &&
                searchResults.map((route) => (
                  <div key={route._id} className="route-options">
                    <Link to={`/routes/${route._id}`}>
                      {" "}
                      <img src={route.image} alt="default-visual" />
                    </Link>
                    <div className="route-info">
                      <h4 className="icon-size-medium">{route.name}</h4>
                      <div>
                        <p className="icon-size-medium">
                          <FontAwesomeIcon
                            icon={faChartSimple}
                            className="icon-size-medium"
                          />{" "}
                          {route.level}
                        </p>
                        <p className="icon-size-medium">
                          <FontAwesomeIcon
                            icon={faShoePrints}
                            className="icon-size-medium"
                          />{" "}
                          {route.distance}km
                        </p>
                        <p className="icon-size-medium">
                          <FontAwesomeIcon
                            icon={faStopwatch}
                            className="icon-size-medium"
                          />{" "}
                          {route.estimatedDuration}hrs.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
