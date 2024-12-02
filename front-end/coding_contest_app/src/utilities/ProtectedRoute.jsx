import { Navigate } from "react-router-dom";
import { useUser } from "../context/user";

const ProtectedRoute = ({ children }) => {
  const { current: user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

export default ProtectedRoute;
