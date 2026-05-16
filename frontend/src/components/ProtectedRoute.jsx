import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, requireAdmin = false, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
