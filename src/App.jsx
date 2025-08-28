import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../components/Sign-Up'; // Assuming file is sign-up.jsx
import SignIn from '../components/sign-in'; // Assuming file is sign-in.jsx

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Sign-Up page */}
        <Route path="/sign-up" element={<Register />} />
        
        {/* Route for the Sign-In page */}
        <Route path="/sign-in" element={<SignIn />} />
        
        {/* Default route: Redirects to the sign-in page */}
        <Route path="/" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default App;