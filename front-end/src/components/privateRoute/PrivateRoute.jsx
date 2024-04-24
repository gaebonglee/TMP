import { Navigate } from "react-router-dom";

const PrivateRoute = ({ token, component: Component }) => {
  return token.user_id ? Component : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
