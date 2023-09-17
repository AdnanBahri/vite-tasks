import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("Auth Route", isAuthenticated);

  return !isAuthenticated ? children : <Navigate to={"/"} replace />;
};
export default AuthRoute;
