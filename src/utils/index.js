//This function is used to uptade the correct format
//required in the Model Route - backened
const formatRouteBody = (routeToFormat) => {
  let inventaryArr;
  if (typeof routeToFormat.inventary === "string") {
    inventaryArr = routeToFormat.inventary
      .split(",")
      .map((item) => item.trim());
  } else {
    inventaryArr = routeToFormat.inventary;
  }
  const distanceNumber = Number(routeToFormat.distance);
  const levelNumber = Number(routeToFormat.level);
  const estimatedNumber = Number(routeToFormat.estimatedDuration);
  if (routeToFormat.tips.trim() === "") {
    routeToFormat.tips = undefined;
  }
  const routeFormatedToDB = {
    ...routeToFormat,
    inventary: inventaryArr,
    distance: distanceNumber,
    level: levelNumber,
    estimatedDuration: estimatedNumber,
  };
  return routeFormatedToDB;
};

//This function is used to uptade the correct format
//required in the Model inventary - backened
const formatBody = (inventary) => {
  let elemArr;
  if (inventary.other === "object" && inventary.other.length === 1) {
    elemArr = ["Nothing more in your inventary"];// check espacios
  }
  if (typeof inventary.other === "string") {
    elemArr = inventary.other.split(",").map((item) => item.trim());
  } else {
    elemArr = inventary.other;
  }
  const inventaryFormated = {
    ...inventary,
    other: elemArr,
  };
  return inventaryFormated;
};

// export default formatRouteBody;

export { formatRouteBody, formatBody };
