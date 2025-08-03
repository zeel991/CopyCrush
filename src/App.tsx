import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhyCopyCrush from './components/WhyCopyCrush';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Demo from './components/Demo';
import LikedCards from './components/LikedCards';
import Header from './components/Header'; // add this
import RegisterTrader from './pages/RegisterTrader';
import TraderProfile from './pages/TraderProfile';

const HomePage = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    <Header /> {/* add this line */}
    <Hero />
    <HowItWorks />
    <WhyCopyCrush />
    <Testimonials />
    <Footer />
  </div>
);



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<Demo />} />
        // Add this route to your App.tsx
<Route path="/trader-profile" element={<TraderProfile />} />

        <Route path="/register-trader" element={<RegisterTrader />} />
        <Route path="/liked" element={<LikedCards />} />
      </Routes>
    </Router>
  );
}

export default App;
