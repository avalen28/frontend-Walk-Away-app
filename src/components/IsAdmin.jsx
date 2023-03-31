import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function IsAdmin({ children }) {

  const { user } = useAuth();
  if (!user.isAdmin) {
    return <Navigate to="/" />; 
  } else {
    return children;
  }
}

export default IsAdmin;