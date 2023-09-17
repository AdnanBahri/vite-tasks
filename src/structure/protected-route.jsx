import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("Auth Status", isAuthenticated);
  return isAuthenticated ? children : <Navigate to={"/signin"} replace />;
};
export default ProtectedRoute;
