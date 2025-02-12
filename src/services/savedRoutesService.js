import axios from "axios";

class SavedRoutesService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/saved-routes`,
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  getAllSavedRoutes() {
    return this.api
      .get("/all")
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  getSingleRoute(routeId) {
    return this.api
      .get(`/${routeId}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  postSavedRoute(routeId) {
    return this.api
      .post(`/add/${routeId}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  editSavedRoute(savedRouteId, status) {
    return this.api
      .put(`/edit/${savedRouteId}`,status)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  deleteSavedRoute(savedRouteId) {
    return this.api
      .delete(`/delete/${savedRouteId}`)
      .catch((error) => console.error(error));
  }
}

const savedRoutesService = new SavedRoutesService();

export default savedRoutesService;
