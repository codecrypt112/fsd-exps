import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const { employee } = useSelector(state => state.auth);
  
  if (!employee) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
