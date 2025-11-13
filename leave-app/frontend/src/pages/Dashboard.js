import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { employee } = useSelector(state => state.auth);
  
  return (
    <div className="dashboard">
      <h1>Welcome {employee?.name}</h1>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Your Leave Balance</h3>
          <p>{employee?.leaveBalance} days remaining</p>
          <Link to="/leaves">Apply for Leave</Link>
        </div>
        
        {employee?.isAdmin && (
          <div className="dashboard-card">
            <h3>Admin Panel</h3>
            <p>Manage employee leaves</p>
            <Link to="/leaves">View All Leaves</Link>
          </div>
        )}
      </div>
    </div>
  );
}
