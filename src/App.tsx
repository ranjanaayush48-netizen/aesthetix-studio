/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { Work } from './components/home/Work';
import { Process } from './components/home/Process';
import { Pricing } from './components/home/Pricing';
import { Reviews } from './components/home/Reviews';
import { FAQ } from './components/home/FAQ';
import { FinalCTA } from './components/home/FinalCTA';
import { StartProject } from './pages/StartProject';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Security } from './pages/Security';
import { AdminLogin } from './admin/auth/AdminLogin';
import { AdminDashboard } from './admin/dashboard/AdminDashboard';
import { AdminProjects } from './admin/projects/AdminProjects';
import { AdminLeads } from './admin/leads/AdminLeads';
import { AdminReviews } from './admin/reviews/AdminReviews';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ScrollToTop } from './components/common/ScrollToTop';

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <Reviews />
      <FAQ />
      <FinalCTA />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/start-project" element={<Layout><StartProject /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
        <Route path="/security" element={<Layout><Security /></Layout>} />
        
        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute><AdminLeads /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
