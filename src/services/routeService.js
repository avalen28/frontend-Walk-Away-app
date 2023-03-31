import axios from "axios";


class RoutesService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/routes`,
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  //all routes
  getRoutes() {
    return this.api
      .get("/all")
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  //single route
  getRoute(id) {
    return this.api
      .get(`/${id}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  //add route
  createNewRoute(body) {
    return this.api
      .post("/new", body)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

// delete route
  deleteRoute(id) {
    return this.api.delete(`/delete/${id}`).catch((error) => console.error(error)); 
  }
}

const routesService = new RoutesService();

export default routesService;
