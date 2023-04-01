import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/users`,
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  //all Users
  getUsers() {
    return this.api
      .get("/all")
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  //user profile
  getUser() {
    return this.api
      .get("/me")
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

}

const userService = new UserService();

export default userService;