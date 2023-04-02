import axios from "axios";

class InventaryService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/inventary`,
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
    getInventary() {
        return this.api
          .get("/")
          .then(({ data }) => data)
          .catch((err) => console.error(err));
    }
  editInventary(body) {
    return this.api
      .put("/edit",body)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
    
}
const inventaryService = new InventaryService();

export default inventaryService;
