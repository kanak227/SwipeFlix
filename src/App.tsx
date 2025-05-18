import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SwipePage from './pages/SwipePage';
import DashboardPage from './pages/DashboardPage';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <Router>
      <MovieProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<SwipePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </MovieProvider>
    </Router>
  );
}

export default App;