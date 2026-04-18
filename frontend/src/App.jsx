import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LeadProvider } from './context/LeadContext';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Import Security
import ProtectedRoute from './components/ProtectedRoute'; // 🟢 Added this

// Import Layout & Pages
import AdminLayout from './components/AdminLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Overview from './pages/Overview';
import LeadPipeline from './pages/LeadPipeline';
import ClientVault from './pages/ClientVault';
import BroadcastEngine from './pages/BroadcastEngine';
import CollegeInventory from './pages/CollegeInventory';
import StudentPortal from './pages/StudentPortal';
import MBBS from './pages/MBBS';
import PublicLayout from './components/public/PublicLayout';
import Archive from './pages/Archive';
import Transactions from './pages/Transactions';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import JamiaHamdardPage from './pages/JamiaHamdardPage';


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <LeadProvider>
        <Routes>
          {/* 🟢 Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jamia-hamdard" element={<JamiaHamdardPage />} />

          {/* 🔒 Protected Admin Routes (Role: admin, super-admin) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
                <AdminLayout><Overview /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
                <AdminLayout><LeadPipeline /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
                <AdminLayout><ClientVault /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/broadcast"
            element={
              <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
                <AdminLayout><BroadcastEngine /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/colleges"
            element={
              <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
                <AdminLayout><CollegeInventory /></AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/archive"
            element={
              <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
                <AdminLayout><Archive /></AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/transactions"
            element={
              <ProtectedRoute allowedRoles={['super-admin']}>
                <AdminLayout><Transactions /></AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 🔒 Protected Student Portal (Role: student) */}
          <Route
            path="/portal"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentPortal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mbbs-abroad"
            element={<MBBS />}
          />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />



        </Routes>
      </LeadProvider>
    </AuthProvider>
  );
}

export default App;