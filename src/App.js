import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import NavBarInf from "./components/NavBarInf";
import ErrorPage from "./views/ErrorPage";
import NotFound from "./views/NotFound";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import IsPrivate from "./components/IsPrivate";
import IsAdmin from "./components/IsAdmin";
//Routes import
import AllRoutes from "./views/Routes/AllRoutes";
import SingleRoute from "./views/Routes/SingleRoute";
import AddRoute from "./views/Routes/AddRoute";
import EditRoute from "./views/Routes/EditRoute";
// Users import 
import AllUsers from "./views/Users/AllUsers";
import UserProfile from "./views/Users/UserProfile";
import EditUser from "./views/Users/EditUser";
// Inventary import 
import Inventary from "./views/Inventary/Inventary";
import EditInventary from "./views/Inventary/EditInventary";
// SavedRoutes import 
import AllSavedRoutes from "./views/SavedRoutes/AllSavedRoutes";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        {/* Routes routes */}
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
        {/* User routes */}
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
        <Route
          path="/users/edit"
          element={
            <IsPrivate>
              <EditUser />
            </IsPrivate>
          }
        />
        {/* Inventary routes */}
        <Route
          path="/inventary"
          element={
            <IsPrivate>
              <Inventary />
            </IsPrivate>
          }
        />
        <Route
          path="/inventary/edit"
          element={
            <IsPrivate>
              <EditInventary />
            </IsPrivate>
          }
        />
        {/* SavedRoutes routes */}
        <Route
          path="/saved-routes/all"
          element={
            <IsPrivate>
              <AllSavedRoutes />
            </IsPrivate>
          }
        />
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Miscel routes */}
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavBarInf />
    </div>
  );
}

export default App;
