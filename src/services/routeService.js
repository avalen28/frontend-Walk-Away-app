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

  getRoutes() {
    return this.api.get("/all").then(({ data }) => data);
  }

  getRoute(id) {
    return this.api.get(`/${id}`).then(({ data }) => data);
  }
}

const routesService = new RoutesService();

export default routesService;
