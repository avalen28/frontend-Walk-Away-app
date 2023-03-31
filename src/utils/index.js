//This function is used to uptade the correct format required in the Model-backened
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

export default formatRouteBody;
