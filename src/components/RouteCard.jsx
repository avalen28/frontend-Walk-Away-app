import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faChartSimple,
  faShoePrints,
  faStopwatch,
  faLocationDot,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faBolt,
  faSnowflake,
  faCloudSun,
  faWind,
  faSmog,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const RouteCard = ({ route }) => {
  const icons = [
    {
      type: "Rain",
      icon: faCloudRain,
    },
    {
      type: "Clear",
      icon: faSun,
    },
    {
      type: "Clouds",
      icon: faCloud,
    },
    {
      type: "Bolt",
      icon: faBolt,
    },
    {
      type: "HeavyRain",
      icon: faCloudShowersHeavy,
    },
    {
      type: "Snow",
      icon: faSnowflake,
    },
    {
      type: "CloudSun",
      icon: faCloudSun,
    },
    {
      type: "Wind",
      icon: faWind,
    },
    {
      type: "Mist",
      icon: faSmog,
    },
    {
      type: "Haze",
      icon: faSmog,
    },
  ];

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const getWeather = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${route.location}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );
      if (weatherResponse) {
        setWeather(weatherResponse.data.weather[0]);
        const result = icons.find(
          (elem) => elem.type === weatherResponse.data.weather[0].main
        );
        setIcon(result.icon);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="route-card-component">
      <div className="route-pictures">
        <h4>{route.name}</h4>
        <Link to={`/routes/${route._id}`}>
          <img
            src={route.image}
            alt="default route view"
            className="route-picture-img"
          />
        </Link>
      </div>
      <div className="route-card-info">
        <img
          src={route.routeImage}
          alt="default map"
          className="route-map-img"
        />
      </div>
      <div className="stats">
        <div className="stats-block">
          <div className="stats-block-1">
            <div className="stats-block-1-info">
              <p>
                <FontAwesomeIcon icon={faChartSimple} />
              </p>
              <p>{route.level}</p>
            </div>
            <div className="stats-block-1-info">
              <p>
                <FontAwesomeIcon icon={faShoePrints} />
              </p>
              <p>{route.distance}km</p>
            </div>
          </div>
          <div className="stats-block-1">
            <div className="stats-block-1-info">
              <p>
                <FontAwesomeIcon icon={faStopwatch} />
              </p>
              <p>{route.estimatedDuration}</p>
            </div>
            <div className="stats-block-1-info">
              <p>
                <FontAwesomeIcon icon={faTrophy} />
              </p>
              <p> 100 xp</p>
            </div>
          </div>
        </div>

        <div className="stats-block-2">
          <div className="stats-block-2-info">
            <p>
              <FontAwesomeIcon icon={faLocationDot} />
            </p>
            <p>{route.location}</p>
          </div>
          {weather &&
             (
              <div className="stats-block-2-info">
                <p>{icon && <FontAwesomeIcon icon={icon} />}</p>
                <p>{weather.main}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
