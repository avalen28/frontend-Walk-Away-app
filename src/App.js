import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import ErrorPage from "./views/ErrorPage";
import NotFound from "./views/NotFound";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import IsPrivate from "./components/IsPrivate";
import IsAdmin from "./components/IsAdmin";
//Routes import------------------------
import AllRoutes from "./views/Routes/AllRoutes";
import SingleRoute from "./views/Routes/SingleRoute";
import AddRoute from "./views/Routes/AddRoute";
import EditRoute from "./views/Routes/EditRoute";
// Users import ----------------------
import AllUsers from "./views/Users/AllUsers";
import UserProfile from "./views/Users/UserProfile";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        {/* Routes route---------------------------------- */}
        <Route path="/routes/all" element={<AllRoutes />} />
        <Route
          path="/routes/:routeId"
          element={
            <IsPrivate>
              <SingleRoute />
            </IsPrivate>
          }
        />
        <Route
          path="/routes/add"
          element={
            <IsPrivate>
              <IsAdmin>
                <AddRoute />
              </IsAdmin>
            </IsPrivate>
          }
        />
        <Route
          path="/routes/edit/:routeId"
          element={
            <IsPrivate>
              <IsAdmin>
                <EditRoute />
              </IsAdmin>
            </IsPrivate>
          }
        />
        {/* User route---------------------------------- */}
        <Route
          path="/users/all"
          element={
            <IsPrivate>
              <IsAdmin>
                <AllUsers />
              </IsAdmin>
            </IsPrivate>
          }
        />
        <Route
          path="/users/me"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
        {/* Auth route---------------------------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Miscel route---------------------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
