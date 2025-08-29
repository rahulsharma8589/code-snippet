import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../components/Sign-Up';
import SignIn from '../components/sign-in';
import Dashboard from '../components/Dashboard'; // Import the Dashboard component
import ProtectedRoute from '../components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default App;