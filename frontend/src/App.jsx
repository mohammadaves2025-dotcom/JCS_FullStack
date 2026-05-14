import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LeadProvider } from './context/LeadContext';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Security
import ProtectedRoute from './components/ProtectedRoute';

// Layout & Core Pages
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
import Archive from './pages/Archive';
import Transactions from './pages/Transactions';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import JamiaHamdardPage from './pages/JamiaHamdardPage';
import FloatingLeadForm from './components/FloatingLeadForm';

// 🟢 SEO Service Pages
import MBBSAdmissionPage from './pages/seo-pages/MBBSAdmissionPage';
import BTechAdmissionPage from './pages/seo-pages/BTechAdmissionPage';
import NursingAdmissionPage from './pages/seo-pages/NursingAdmissionPage';
import MBABBAAdmissionPage from './pages/seo-pages/MBABBAAdmissionPage';
import DelhiCollegeAdmissionPage from './pages/seo-pages/DelhiCollegeAdmissionPage';
import BPharmAdmissionPage from './pages/seo-pages/BPharmAdmissionPage';
import ContactUsPage from './pages/seo-pages/ContactUsPage';
import BlogPage from './pages/seo-pages/BlogPage';
import BlogPostPage from './pages/seo-pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <LeadProvider>
        <FloatingLeadForm />
        <Routes>
          {/* ══════════ PUBLIC ROUTES ══════════ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Core Service Pages */}
          <Route path="/jamia-hamdard" element={<JamiaHamdardPage />} />
          <Route path="/mbbs-abroad" element={<MBBS />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* 🟢 SEO Service Pages */}
          <Route path="/mbbs-admission" element={<MBBSAdmissionPage />} />
          <Route path="/btech-admission" element={<BTechAdmissionPage />} />
          <Route path="/nursing-admission" element={<NursingAdmissionPage />} />
          <Route path="/mba-bba-admission" element={<MBABBAAdmissionPage />} />
          <Route path="/delhi-college-admission" element={<DelhiCollegeAdmissionPage />} />
          <Route path="/bpharm-admission" element={<BPharmAdmissionPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* ══════════ PROTECTED ADMIN ROUTES ══════════ */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
              <AdminLayout><Overview /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/leads" element={
            <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
              <AdminLayout><LeadPipeline /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/clients" element={
            <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
              <AdminLayout><ClientVault /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/broadcast" element={
            <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
              <AdminLayout><BroadcastEngine /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/colleges" element={
            <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
              <AdminLayout><CollegeInventory /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/archive" element={
            <ProtectedRoute allowedRoles={['counselor', 'super-admin']}>
              <AdminLayout><Archive /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/transactions" element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <AdminLayout><Transactions /></AdminLayout>
            </ProtectedRoute>
          } />

          {/* ══════════ PROTECTED STUDENT PORTAL ══════════ */}
          <Route path="/portal" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          } />

          {/* ══════════ 404 FALLBACK ══════════ */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LeadProvider>
    </AuthProvider>
  );
}

export default App;
