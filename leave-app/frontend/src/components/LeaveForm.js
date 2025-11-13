import { useMemo, useState } from 'react';
import axios from 'axios';

export default function LeaveForm({ leaveTypes, token, onSuccess }) {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasLeaveTypes = useMemo(() => leaveTypes.length > 0, [leaveTypes]);
  
  const { leaveType, startDate, endDate, reason } = formData;
  
  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!hasLeaveTypes || !token) return;
    
    try {
      setIsSubmitting(true);
      await axios.post(
        'http://localhost:5000/api/leaves',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      onSuccess();
      setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting leave application');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="leave-form">
      <h3>Apply for Leave</h3>
      {error && <div className="error">{error}</div>}
      {!hasLeaveTypes && (
        <div className="info">
          No leave types available right now. Please contact an administrator.
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div>
          <label>Leave Type</label>
          <select
            name="leaveType"
            value={leaveType}
            onChange={onChange}
            disabled={!hasLeaveTypes}
            required
          >
            <option value="">{hasLeaveTypes ? 'Select Leave Type' : 'No leave types available'}</option>
            {leaveTypes.map(type => (
              <option key={type._id} value={type._id}>{type.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Start Date</label>
          <input 
            type="date" 
            name="startDate" 
            value={startDate} 
            onChange={onChange} 
            disabled={!hasLeaveTypes}
            required 
          />
        </div>
        
        <div>
          <label>End Date</label>
          <input 
            type="date" 
            name="endDate" 
            value={endDate} 
            onChange={onChange} 
            disabled={!hasLeaveTypes}
            required 
          />
        </div>
        
        <div>
          <label>Reason</label>
          <textarea 
            name="reason" 
            value={reason} 
            onChange={onChange} 
            disabled={!hasLeaveTypes}
            required 
          />
        </div>
        
        <button type="submit" disabled={!hasLeaveTypes || isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
