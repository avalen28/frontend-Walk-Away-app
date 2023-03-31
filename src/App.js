import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import IsAdmin from './components/IsAdmin';
//Routes import------------------------
import AllRoutes from './views/Routes/AllRoutes';
import SingleRoute from './views/Routes/SingleRoute';
import AddRoute from './views/Routes/AddRoute';
import DeleteRoute from "./views/Routes/DeleteRoute";
import EditRoute from "./views/Routes/EditRoute";


function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/routes" element={<AllRoutes />} />
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
        <Route path="/routes/edit/:routeId" element={<EditRoute />} />
        <Route path="/routes/delete" element={<DeleteRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
