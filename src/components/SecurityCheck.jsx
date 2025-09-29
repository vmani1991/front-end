import React, { useState } from 'react';
import axios from 'axios';

function SecurityCheck() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  // Use environment variable for API base URL
  const API = process.env.REACT_APP_API_BASE_URL;

  const checkRequest = async () => {
    try {
      const res = await axios.get(`${API}/api/requests/code/${code}`);
      const req = res.data;
      if (req.status === 'Approved') setStatus(`✅ ${req.studentName} allowed inside`);
      else if (req.status === 'Rejected') setStatus(`❌ ${req.studentName} denied entry`);
      else setStatus(`⏳ ${req.studentName} approval pending`);
    } catch (err) {
      setStatus('❌ Request not found!');
    }
  };

  return (
    <div>
      <h2>Security Check</h2>
      <input
        placeholder="Enter Request Code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={checkRequest}>Check</button>
      <p>{status}</p>
    </div>
  );
}

export default SecurityCheck;
