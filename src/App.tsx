/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import PassengerHome from './pages/PassengerHome';
import BusDetails from './pages/BusDetails';
import DriverDashboard from './pages/DriverDashboard';
import RouteSelection from './pages/RouteSelection';

function AppContent() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passenger-home" element={<PassengerHome />} />
        <Route path="/bus-details" element={<BusDetails />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/route-selection" element={<RouteSelection />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full max-w-[480px] mx-auto bg-bg-light shadow-2xl overflow-hidden scroll-smooth">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

