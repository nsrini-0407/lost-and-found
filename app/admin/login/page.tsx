'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!secret) {
      setError('Please enter the admin key.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      if (res.ok) {
        window.location.href = '/admin';
      } else {
        setError('Invalid admin key. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <h1 style={{ marginBottom: 24, fontSize: 24 }}>Admin Login</h1>
        {error && (
          <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>
        )}
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="Enter admin key"
          style={{ width: '100%', padding: 10, fontSize: 16,
                   marginBottom: 12, display: 'block' }}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: 12, fontSize: 16, cursor: 'pointer' }}
        >
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}