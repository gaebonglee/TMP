import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, role }) => {
  return token.role === role ? Component : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
