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
    return this.api.get("/all").then(({ data }) => data);
  }
  //single route
  getRoute(id) {
    return this.api.get(`/${id}`).then(({ data }) => data);
  }
  //add route
  createNewRoute(body) {
    return this.api.post("/new", body).then(({data})=>data)
  }
}

const routesService = new RoutesService();

export default routesService;
