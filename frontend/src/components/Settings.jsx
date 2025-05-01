import React from 'react';

function Settings() {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100">
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '32px 40px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          minWidth: 320,
          textAlign: 'center'
        }}
      >
        <h2 className="fw-bold mb-3">Settings</h2>
        <div style={{ fontSize: '1.1rem', color: '#222', fontWeight: 600, marginBottom: 16 }}>
          Account Settings
        </div>
        <div style={{ color: '#666', fontSize: '1rem', marginBottom: 8 }}>
          <label>
            <span style={{ marginRight: 8 }}>Notifications</span>
            <input type="checkbox" />
          </label>
        </div>
        <div style={{ color: '#666', fontSize: '1rem', marginBottom: 8 }}>
          <label>
            <span style={{ marginRight: 8 }}>Dark Mode</span>
            <input type="checkbox" />
          </label>
        </div>
        <button className="btn btn-primary mt-3" disabled>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;