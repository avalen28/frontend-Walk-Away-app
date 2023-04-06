//This function is used to uptade the correct format
//required in the Model Route - backened
const formatRouteBody = (routeToFormat) => {
  console.log(routeToFormat);
  let inventaryArr;
  if (typeof routeToFormat.inventary !== "object") {
   return false
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
  if (typeof inventary.other === "undefined") {
    console.log("undefined");
    return false;
  }
  if (typeof inventary.other === "object") {
    elemArr = inventary.other;
  }

  if (typeof inventary.other === "string") {
    if (inventary.other.trim() !== "" && inventary.other.trim() !== ",") {
      elemArr = inventary.other.split(",").map((elem) => elem.trim());
    } else if (inventary.other.trim() === "") {
      elemArr = ["Empty"];
    } else if (inventary.other.trim() === ",") {
      elemArr = ["Empty"];
    }
  }
  const inventaryFormated = {
    ...inventary,
    other: elemArr,
  };
  return inventaryFormated;
};

// export default formatRouteBody;

export { formatRouteBody, formatBody };
