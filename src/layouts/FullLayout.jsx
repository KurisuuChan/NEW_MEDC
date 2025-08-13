// src/layouts/FullLayout.jsx
import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// Lazy-loaded pages from the new 'features' directory
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Management = lazy(() => import("@/features/inventory/Management"));
const Archived = lazy(() => import("@/features/inventory/Archived"));
const PointOfSales = lazy(() => import("@/features/pos/PointOfSales"));
const Contacts = lazy(() => import("@/pages/Contacts")); // Assuming this page is not part of a feature yet
const Settings = lazy(() => import("@/features/settings/Settings"));
const NotificationHistory = lazy(() => import("@/pages/NotificationHistory")); // Assuming this page is not part of a feature yet
const Financials = lazy(() => import("@/features/reports/Financials"));

const FullLayout = ({ branding, user, handleLogout, onUpdate }) => (
  <div className="flex h-screen bg-gray-200">
    <Sidebar branding={branding} />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header handleLogout={handleLogout} user={user} />
      <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-white to-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/management" element={<Management />} />
          <Route path="/archived" element={<Archived />} />
          <Route
            path="/point-of-sales"
            element={<PointOfSales branding={branding} />}
          />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/notifications" element={<NotificationHistory />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/settings" element={<Settings onUpdate={onUpdate} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  </div>
);

FullLayout.propTypes = {
  branding: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FullLayout;
