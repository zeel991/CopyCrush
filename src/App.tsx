import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhyCopyCrush from './components/WhyCopyCrush';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Demo from './components/Demo';
import LikedCards from './components/LikedCards';
import Header from './components/Header';
import RegisterTrader from './pages/RegisterTrader';
import TraderProfile from './pages/TraderProfile';

const HomePage = () => (
  <div className="min-h-screen text-white">
    <Header />
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
        <Route path="/trader-profile" element={<TraderProfile />} />
        <Route path="/register-trader" element={<RegisterTrader />} />
        <Route path="/liked" element={<LikedCards />} />
      </Routes>
    </Router>
  );
}

export default App;