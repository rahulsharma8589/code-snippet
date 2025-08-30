// components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SnippetForm from './SnippetForm'; // 1. Import the form component

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // 2. Fetch snippets when the component loads
  useEffect(() => {
    const fetchSnippets = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/sign-in');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/snippets', {
          headers: { 'x-auth-token': token },
        });

        if (response.ok) {
          const data = await response.json();
          setSnippets(data);
        } else {
          // Handle errors like an expired token
          localStorage.removeItem('token');
          navigate('/sign-in');
        }
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };
    fetchSnippets();
  }, [navigate]);

  // 3. Handle the creation of a new snippet
  const handleCreateSnippet = async (snippetData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/snippets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(snippetData),
        });
        
        if (response.ok) {
            const newSnippet = await response.json();
            setSnippets([newSnippet, ...snippets]); // Add the new snippet to the top of the list
            setShowForm(false); // Hide the form after successful creation
        } else {
            console.error('Failed to create snippet');
        }
    } catch (error) {
        console.error('Error creating snippet:', error);
    }
  };

  // 4. Handle the deletion of a snippet
  const handleDeleteSnippet = async (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/snippets/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token },
            });
            if (response.ok) {
                // Remove the snippet from the local state
                setSnippets(snippets.filter(snippet => snippet._id !== id));
            } else {
                console.error('Failed to delete snippet');
            }
        } catch (error) {
            console.error('Error deleting snippet:', error);
        }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen text-white p-4" style={{ background: 'radial-gradient(ellipse at center, #4a4a4a 0%, #2B2B2D 70%, #1a1a1a 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Snippets</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold transition-colors"
            >
              {showForm ? 'Cancel' : '+ New Snippet'}
            </button>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 5. Conditionally render the SnippetForm */}
        {showForm && <SnippetForm onSubmit={handleCreateSnippet} onCancel={() => setShowForm(false)} />}

        {/* 6. Display the list of snippets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {snippets.length > 0 ? snippets.map(snippet => (
            <div key={snippet._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-blue-300">{snippet.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{snippet.language}</p>
                <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  <code>{snippet.code}</code>
                </pre>
                 <div className="mt-2">
                    {snippet.tags.map(tag => (
                        <span key={tag} className="inline-block bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold text-gray-300 mr-2">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
               <div className="mt-4 flex justify-end space-x-2">
                <button onClick={() => handleDeleteSnippet(snippet._id)} className="text-red-500 hover:text-red-400 text-sm font-semibold">Delete</button>
                {/* Edit button can be added here later */}
              </div>
            </div>
          )) : (
              <p className="text-gray-400 col-span-full text-center mt-8">You haven't created any snippets yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}