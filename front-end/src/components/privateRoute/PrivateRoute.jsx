import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, role }) => {
  let result = false;

  if (token.role !== undefined) {
    if (role === undefined || token.role === role || token.role === "admin") {
      result = true;
    }
  }
  return result ? Component : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
