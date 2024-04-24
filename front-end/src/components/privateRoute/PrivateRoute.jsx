import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, component: Component }) => {
  return authenticated.user_id ? Component : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
