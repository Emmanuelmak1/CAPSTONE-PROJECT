import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login'; // Import the Login component
import Signup from './components/Signup';
import MainPage from './components/MainPage';
import LoginPopUp from './components/LoginPopUp';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider context

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with the AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginpopup" element={<LoginPopUp />} /> {/* Render the Login component */}
          <Route path="/signup" element={<Signup />} />
          {/* Correctly using ProtectedRoute */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
