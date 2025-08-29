import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/sign-in');
          return;
        }

        const response = await fetch('http://localhost:5000/api/protected/dashboard', {
          headers: {
            'x-auth-token': token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setUser(data.user);
        } else {
          // Handle token expiration or other errors
          localStorage.removeItem('token');
          navigate('/sign-in');
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
        localStorage.removeItem('token');
        navigate('/sign-in');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen text-white p-4 relative" style={{ background: 'radial-gradient(ellipse at center, #4a4a4a 0%, #2B2B2D 70%, #1a1a1a 100%)' }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          {message && <p className="mb-4">{message}</p>}
          {user && <p className="mb-4">User ID: {user.id}</p>}
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-lg font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 active:scale-95 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}