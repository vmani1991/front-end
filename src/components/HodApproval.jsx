import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HodApproval() {
  const [requests, setRequests] = useState([]);

  // Get API base URL from environment variable
  const API = process.env.REACT_APP_API_BASE_URL;

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/api/requests`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApproval = async (id, action) => {
    try {
      await axios.put(`${API}/api/requests/${id}/status`, {
        status: action,
      });
      fetchRequests(); // Refresh the list
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h2>HOD Approval</h2>
      {requests.length === 0 && <p>No requests submitted yet.</p>}
      {requests.map((req) => (
        <div
          key={req._id}
          style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}
        >
          <p>
            <b>{req.studentName}</b> - {req.reason} - Status: {req.status}
          </p>
          {req.status === 'Pending' && (
            <div>
              <button onClick={() => handleApproval(req._id, 'Approved')}>Approve ✅</button>
              <button onClick={() => handleApproval(req._id, 'Rejected')}>Reject ❌</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HodApproval;
