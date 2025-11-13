import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeaveForm from '../components/LeaveForm';

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { employee, token } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!token) return;
    fetchLeaves();
    fetchLeaveTypes();
  }, [token, employee?.isAdmin]);
  
  const fetchLeaves = async () => {
    try {
      if (!token) return;
      const url = employee.isAdmin 
        ? 'http://localhost:5000/api/leaves'
        : 'http://localhost:5000/api/leaves/my-leaves';
      
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLeaves(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Error fetching leaves');
    }
  };
  
  const fetchLeaveTypes = async () => {
    try {
      if (!token) return;
      const res = await axios.get('http://localhost:5000/api/leave-types', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLeaveTypes(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Error fetching leave types');
    }
  };
  
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leaves/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchLeaves();
    } catch (err) {
      console.error(err.response?.data?.message || 'Error updating leave status');
    }
  };
  
  return (
    <div className="leaves-container">
      <div className="leaves-header">
        <h2>{employee.isAdmin ? 'Manage Leaves' : 'My Leaves'}</h2>
        {!employee.isAdmin && (
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Apply for Leave'}
          </button>
        )}
      </div>
      
      {showForm && (
        <LeaveForm 
          leaveTypes={leaveTypes} 
          token={token}
          onSuccess={() => {
            setShowForm(false);
            fetchLeaves();
          }} 
        />
      )}
      
      {leaves.length === 0 ? (
        <div className="empty-state">
          <h3>No leave applications found</h3>
          <p>When you submit a leave request it will appear here for tracking.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {employee.isAdmin && <th>Employee</th>}
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              {employee.isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.map(leave => (
              <tr key={leave._id}>
                {employee.isAdmin && <td>{leave.employee?.name}</td>}
                <td>{leave.leaveType?.name}</td>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className={`status-${leave.status}`}>{leave.status}</td>
                {employee.isAdmin && (
                  <td className="leaves-actions">
                    {leave.status === 'pending' ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusChange(leave._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatusChange(leave._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="decision-meta">
                        {leave.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
