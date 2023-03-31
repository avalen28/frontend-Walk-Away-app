import React from "react";
import { useState } from "react";
import routesService from "../../services/routeService";
import { useAuth } from "../../hooks/useAuth";

const AddRoute = () => {
  const [newRoute, setNewRoute] = useState({
    name: "",
    image: "",
    distance: 0,
    level: 1,
    description: "",
    estimatedDuration: 0,
    inventary: [],
    tips: "",
  });

  return <div>Add route view</div>;
};

export default AddRoute;
